import {Stack} from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";

export const createSingleRole = (stack: Stack, tableName: string, action: string) => {
    const role = new iam.Role(stack, 'LambdaDynamoDBRole', {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com')
    });

    const policy = new iam.Policy(stack, 'LambdaDynamoDBPolicy', {
        policyName: 'LambdaDynamoDBPolicy',
        roles: [role],
        statements: [
            new iam.PolicyStatement({
                actions: [`dynamodb:${action}`],
                resources: [`arn:aws:dynamodb:us-east-1:750245270653:table/${tableName}`]
            })
        ]
    });

}