import json
import os


def main(event, _):
    json_region = os.environ['AWS_REGION']
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
        },
        'body': json.dumps('Hello from  read  Lambda!')
    }
