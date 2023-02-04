import {Stack} from "aws-cdk-lib";
import {LambdaIntegration} from "aws-cdk-lib/aws-apigateway";
import {Table} from "aws-cdk-lib/aws-dynamodb";
import {Code, Function as Lambda, ILayerVersion, Runtime} from "aws-cdk-lib/aws-lambda";
import {join} from "path";
import * as iam from 'aws-cdk-lib/aws-iam';
import {config} from "../config/configuration";


export interface TableProps {
    lambdaName: string;
    servicePath: string;
    createLambda?: string;
    readLambda?: string;
    updateLambda?: string;
    deleteLambda?: string;
    layerVersion: ILayerVersion;
}

export class GenericLambda {
    private readonly stack: Stack;
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
        this.createLambdas();
    }

    private createLambdas() {
        if (this.props.createLambda && this.props.servicePath) {
            this.createLambda = this.createSingleLambda(this.props.servicePath, this.props.createLambda, 'PutItem', config.dynamoDbTableName);
            this.createLambdaIntegration = new LambdaIntegration(this.createLambda);
        }
        if (this.props.readLambda && this.props.servicePath) {
            this.readLambda = this.createSingleLambda(this.props.servicePath, this.props.readLambda, 'Query', config.dynamoDbTableName);
            this.readLambdaIntegration = new LambdaIntegration(this.readLambda);
        }
        if (this.props.updateLambda && this.props.servicePath) {
            this.updateLambda = this.createSingleLambda(this.props.servicePath, this.props.updateLambda, 'UpdateItem', config.dynamoDbTableName);
            this.updateLambdaIntegration = new LambdaIntegration(this.updateLambda);
        }
        if (this.props.deleteLambda && this.props.servicePath) {
            this.deleteLambda = this.createSingleLambda(this.props.servicePath, this.props.deleteLambda, 'DeleteItem', config.dynamoDbTableName);
            this.deleteLambdaIntegration = new LambdaIntegration(this.deleteLambda);
        }
    }

    private createSingleLambda(servicePath: string, lambdaName: string, action: string, tableName: string): Lambda {

        const lambdaId = `${lambdaName}${this.props.lambdaName}`;

        const lambdaFunc = new Lambda(this.stack, lambdaId, {
            functionName: `${lambdaId}-lambda`,
            runtime: Runtime.PYTHON_3_9,
            handler: "handler.main",
            code: Code.fromAsset(
                join(__dirname, "..", "..", "backend", "services", servicePath, lambdaName, "core")
            ),

            layers: [this.props.layerVersion],
            environment: {
                TABLE_NAME: config.dynamoDbTableName,
            },
        });

        // 👇 create a policy statement
        const s3ListBucketsPolicy = new iam.PolicyStatement({
            actions: [`dynamodb:${action}`],
            resources: [`arn:aws:dynamodb:us-east-1:750245270653:table/${tableName}`],
        });
        lambdaFunc.role?.attachInlinePolicy(
            new iam.Policy(this.stack, `LambdaDynamoDBPolicy-${action}${this.props.lambdaName}`, {
                statements: [s3ListBucketsPolicy],
            }),
        );
        return lambdaFunc
    }


}
