import os


def main(event, _):
  json_region = os.environ['AWS_REGION']
  return {
      "statusCode": 200,
      "headers": {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': '*'
      },
      "body": 'Hello from Update Department lambda!'
  }
