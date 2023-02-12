import {Duration, Stack} from "aws-cdk-lib";
import {LambdaIntegration} from "aws-cdk-lib/aws-apigateway";
import {Code, Function as Lambda, ILayerVersion, Runtime} from "aws-cdk-lib/aws-lambda";
import {join} from "path";
import * as iam from 'aws-cdk-lib/aws-iam';
import {config} from "../config/configuration";
import {createSqsEventRole} from "./roleCreator";
import {GenericQueue} from "./GenericQueue";
import {SqsEventSource} from "@aws-cdk/aws-lambda-event-sources";
import {IQueue} from "aws-cdk-lib/aws-sqs";
import {SqsDestination} from "aws-cdk-lib/aws-lambda-destinations";
import {PolicyStatement, Role, ServicePrincipal} from "aws-cdk-lib/aws-iam";


export interface TableProps {
    lambdaName: string;
    servicePath: string;
    createLambda?: string;
    layerVersion: ILayerVersion;
    employeeQueue: IQueue;
}

export class CompanyLambda {
    private readonly stack: Stack;
    private props: TableProps;
    private createLambda: Lambda | undefined;
    public createLambdaIntegration: LambdaIntegration;

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
            this.createLambda = this.createSingleLambda(this.props.servicePath, this.props.createLambda, 'PutItem');
            this.createLambdaIntegration = new LambdaIntegration(this.createLambda);
        }
    }

    private createSingleLambda(servicePath: string, lambdaName: string, action: string): Lambda {

        const lambdaId = `${lambdaName}${this.props.lambdaName}`;


        const role = new Role(this.stack, "SendMessage", {
            roleName: "SendEventRole",
            assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
        });

        role.addToPolicy(
            new PolicyStatement({
                resources: ["*"],
                actions: [
                    "sqs:*",
                    "kms:Decrypt",
                    "cloudwatch:*",
                    "logs:*",
                ],
            })
        );
        const lambdaFunc = new Lambda(this.stack, lambdaId, {
            functionName: `${config.environmentKey}-${lambdaId}-lambda`,
            runtime: Runtime.PYTHON_3_9,
            handler: "handler.main",
            role: role,
            code: Code.fromAsset(
                join(__dirname, "..", "..", "backend", "services", servicePath, lambdaName, "core")
            ),
            layers: [this.props.layerVersion],
            environment: {
                TABLE_NAME: config.dynamoDbTableName,
                EMPLOYEE_QUEUE_NAME: this.props.employeeQueue.queueName
            },
            onSuccess: new SqsDestination(this.props.employeeQueue),
        });

        const dynamoDbPolicy = new iam.PolicyStatement({
            actions: [`dynamodb:${action}`],
            resources: [`arn:aws:dynamodb:us-east-1:750245270653:table/${config.dynamoDbTableName}`],
        });


        lambdaFunc.role?.attachInlinePolicy(
            new iam.Policy(this.stack, `LambdaDynamoDBPolicy-${action}${this.props.lambdaName}`, {
                statements: [dynamoDbPolicy],
            }),
        );
        return lambdaFunc
    }


}
