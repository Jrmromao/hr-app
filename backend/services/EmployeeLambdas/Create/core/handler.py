import json
import os
import uuid
import boto3
from datetime import datetime

from utils.helpers import event_parser

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ.get('TABLE_NAME'))


# the purpose of this lambda is to create new employees
# the id for an employee PK as: COM#{companyId} and SK EMP#{employeeID}
def main(event, _):
    now = datetime.now()

    emp_id = uuid.uuid4()

    try:
        employee_data = event_parser(event)

        table.put_item(
            Item={
                'PK': f'COMP#{employee_data.get("company_id", None)}',
                'SK': f'#EMP{emp_id}',
                'staff_number': employee_data.get('staff_number', None),
                'first_name': employee_data.get('first_name', None),
                'last_name': employee_data.get('last_name', None),
                'date_joined': str(now),
                'email': employee_data.get('email_address', None),
                'social_security': None,
                'address': None,
            },
        )
    except:
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
