import json
import os
import boto3


def format_result(data: dict):
    return [item for item in data if len(item) != 2]


def main(event, _):
    # event = json.loads(event['queryStringParameters'])
    # json_region = os.environ['AWS_REGION']
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(os.environ.get('TABLE_NAME'))
    companyId = 'COMP#f8905237-1510-420e-bf6b-0ec6b288dd2b'
    print(companyId)
    index_name = 'CompanyEmployeesindex'
    result = table.query(
        IndexName=index_name,
        KeyConditionExpression='PK = :partitionValue',
        ExpressionAttributeValues={
            ':partitionValue': companyId
        }
    )
    resultData = format_result(result.get('Items'))
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET'
        },
        'body': json.dumps(resultData)
    }
