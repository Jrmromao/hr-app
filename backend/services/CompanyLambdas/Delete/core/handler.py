import json
import os


def main(event, _):
    json_region = os.environ['AWS_REGION']
    return {
        "statusCode": 200,
        "headers": {          
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'DELETE'
            
        },
       'body': json.dumps('Hello from  '+event['resource']+' delete  Lambda!')
    }
