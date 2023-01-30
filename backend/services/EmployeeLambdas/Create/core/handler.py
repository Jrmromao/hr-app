import json
import os


def main(event, _):
    return {
        'statusCode': 200,
        'headers': {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*'
        },
        'body': json.dumps('Hello from  ' + event['resource'] + ' create  Lambda!')
    }
