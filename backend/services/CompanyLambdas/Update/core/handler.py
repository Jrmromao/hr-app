import json
import os


def main(event, _):
  json_region = os.environ['AWS_REGION']
  return {
      "statusCode": 200,
      "headers": {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'PUT'
      },
      'body': json.dumps('Hello from  ' + event['resource'] + ' create  Lambda!')
  }
