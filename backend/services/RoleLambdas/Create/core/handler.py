import json
import os
import boto3

def main(event, _):
    # Create a DynamoDB client
    dynamodb = boto3.client('dynamodb')
    return {
        'statusCode': 200,
        'headers': {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
        },
        'body': json.dumps('Hello from  create Role Lambda!')
    }
