import {Stack} from "aws-cdk-lib";
import {LambdaIntegration} from "aws-cdk-lib/aws-apigateway";
import {AttributeType, Table} from "aws-cdk-lib/aws-dynamodb";
import {Code, Function as Lambda, ILayerVersion, LayerVersion, Runtime} from "aws-cdk-lib/aws-lambda";
import {join} from "path";

export interface TableProps {
    tableName: string;
    primaryKey: string;
    servicePath: string;
    createLambdaPath?: string;
    readLambdaPath?: string;
    updateLambdaPath?: string;
    deleteLambdaPath?: string;
    secondaryIndexes?: string[];
    sortKey?: string;
    layerVersion: ILayerVersion;
}

export class GenericTable {
    private stack: Stack;
    private table: Table;
    private props: TableProps;

    private createLambda: Lambda | undefined;
    private readLambda: Lambda | undefined;
    private updateLambda: Lambda | undefined;
    private deleteLambda: Lambda | undefined;

    public createLambdaIntegration: LambdaIntegration;
    public readLambdaIntegration: LambdaIntegration;
    public updateLambdaIntegration: LambdaIntegration;
    public deleteLambdaIntegration: LambdaIntegration;

    public constructor(stack: Stack, props: TableProps) {
        this.stack = stack;
        this.props = props;
        this.initialize();
    }

    private initialize() {
        this.createTable();
        this.addSecondaryIndexes();
        this.createLambdas();
        this.grantTableRights();
    }

    private createTable() {
        this.table = new Table(this.stack, this.props.tableName, {
            partitionKey: {
                name: this.props.primaryKey,
                type: AttributeType.STRING,
            },

            tableName: this.props.tableName,
        });
    }

    private addSecondaryIndexes() {
        if (this.props.secondaryIndexes) {
            for (const secondaryIndex of this.props.secondaryIndexes) {
                this.table.addGlobalSecondaryIndex({
                    indexName: secondaryIndex,
                    partitionKey: {
                        name: secondaryIndex,
                        type: AttributeType.STRING,
                    },
                });
            }
        }
    }

    private createLambdas() {
        if (this.props.createLambdaPath && this.props.servicePath) {
            this.createLambda = this.createSingleLambda(this.props.servicePath, this.props.createLambdaPath);
            this.createLambdaIntegration = new LambdaIntegration(this.createLambda);
        }
        if (this.props.readLambdaPath && this.props.servicePath) {
            this.readLambda = this.createSingleLambda(this.props.servicePath, this.props.readLambdaPath);
            this.readLambdaIntegration = new LambdaIntegration(this.readLambda);
        }
        if (this.props.updateLambdaPath && this.props.servicePath) {
            this.updateLambda = this.createSingleLambda(this.props.servicePath, this.props.updateLambdaPath);
            this.updateLambdaIntegration = new LambdaIntegration(this.updateLambda);
        }
        if (this.props.deleteLambdaPath && this.props.servicePath) {
            this.deleteLambda = this.createSingleLambda(this.props.servicePath, this.props.deleteLambdaPath);
            this.deleteLambdaIntegration = new LambdaIntegration(this.deleteLambda);
        }
    }

    private grantTableRights() {
        if (this.createLambda) {
            this.table.grantWriteData(this.createLambda);
        }
        if (this.readLambda) {
            this.table.grantReadData(this.readLambda);
        }
        if (this.updateLambda) {
            this.table.grantWriteData(this.updateLambda);
        }
        if (this.deleteLambda) {
            this.table.grantWriteData(this.deleteLambda);
        }
    }

    private createSingleLambda(servicePath: string, lambdaName: string): Lambda {
        const lambdaId = `${this.props.tableName}-${lambdaName}`;


        return new Lambda(this.stack, lambdaId, {
            functionName: `${lambdaId}-lambda`,
            runtime: Runtime.PYTHON_3_9,
            handler: "handler.main",
            code: Code.fromAsset(
                join(__dirname, "..", "..", "backend", "services", servicePath, lambdaName, "core")
            ),
            layers: [this.props.layerVersion],
            environment: {
                TABLE_NAME: this.props.tableName,
                PRIMARY_KEY: this.props.primaryKey,
            },
        });
    }
}
