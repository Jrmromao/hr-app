import json
import os
import uuid
import boto3
from datetime import datetime


dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Company')


def main(event, _):
    now = datetime.now()
    myuuid = uuid.uuid4()

    print('Your UUID is: ' + str(myuuid))
    company = json.loads(event['body'])
    table.put_item(
        Item={
            'companyId': uuid.uuid4(),
            'datetime_registered': now,
            'companyName': company.get('companyName'),
            'phoneNumber': company.get('phoneNumber'),
            'email': company.get('email'),
            'NumOfEmployees': company.get('numEmployees'),
        }
    )

    return {
        'statusCode': 200,
        'headers': {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST'
        },
        'body': json.dumps('Hello from  ' + event['resource'] + ' create  Lambda!')
    }
