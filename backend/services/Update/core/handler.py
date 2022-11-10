import os


def main(event, _):
  json_region = os.environ['AWS_REGION']
  return {
      "statusCode": 200,
      "headers": {
          "Content-Type": "application/json"
      },
      "body": 'Hello from Update lambda!'
  }
