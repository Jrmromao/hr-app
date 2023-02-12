import json
import os
import uuid
import boto3
from datetime import date

from utils.helpers import event_parser

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ.get('TABLE_NAME'))


# the purpose of this lambda is to create new employees
# the id for an employee PK as: COM#{companyId} and SK EMP#{employeeID

def main(event, _):
    date_joined = date.now()

    emp_id = uuid.uuid4()

    try:
        employee_data = event_parser(event)

        table.put_item(
            Item={
                'PK': f'COMP#{employee_data.get("company_id")}',
                'SK': f'#EMP{str(emp_id)}',
                'staff_number': employee_data.get('staff_number', None),
                'first_name': employee_data.get('first_name', None),
                'last_name': employee_data.get('last_name', None),
                'date_joined': str(date_joined),
                'email': employee_data.get('email_address', None),
                'social_security': employee_data.get('social_security', None),
                'address': employee_data.get('address', None),
                'contract_type': employee_data.get('contract_type', None),
                'job_title': employee_data.get('job_title', None),
                'team': employee_data.get('team', None),
                'gender': employee_data.get('gender', None),
                'date_of_birth': employee_data.get('date_of_birth)', None),
                'nationality': employee_data.get('nationality', None),
                'phone_number': employee_data.get('team', None),
            },
        )

    except ValueError as e:
        print("The email already exists in the table", str(e))
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST'
        },
        'body': json.dumps('Hello from create  Lambda!')
    }
