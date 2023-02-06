import json
import os
import uuid
import boto3
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('Comp')


def main(event, _):
    now = datetime.now()
    companyId = uuid.uuid4()
    emp_id = uuid.uuid4()

    # the purpose of this lambda is to create new employees
    # the id for an employee PK as: COM#{companyId} and SK EMP#{employeeID}
    try:

        # company = json.loads(event['body'])
        table.put_item(
            Item={
                'PK': f'COMP#df72005a-73ea-4432-8117-fe2d3142df33',
                'SK': f'#EMP{emp_id}',
                'first_name': 'Joao',
                'last_name': 'Romao',
                'date_joined': str(now),
                'email': 'test@mail.com',
                'social_security': '1230986J',
                'address': '104 Rua da Junta, Galveias, Portugal',
            },
        )
    except dynamodb.exceptions.ConditionalCheckFailedException:
        print("The email already exists in the table")
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST'
        },
        'body': json.dumps('Hello from create  Lambda!')
    }
