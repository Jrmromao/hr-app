import json
import os
import uuid
import boto3
from datetime import datetime

from models.SQSMessage import SQSMessage

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ.get('TABLE_NAME'))
sqs = boto3.resource('sqs')
queue = sqs.get_queue_by_name(QueueName=os.environ.get('EMPLOYEE_QUEUE_NAME'))

def main(event, _):
    now = datetime.now()
    companyId = uuid.uuid4()
    emp_id = uuid.uuid4()

    # the purpose of this lambda is to create new companies

    try:
        print(event)
        # companyData = json.loads(event['body'])
        # companyData.get('companyName')
        # companyData.get('numEmployees')
        # the first employee details:
        # first_name, last_name, email_address, phone_number - these details will be sent to the lambda for employee creation via SQS message
        result = table.put_item(
            Item={
                'PK': f'COMP#{companyId}',
                'SK': f'#METADATA#{companyId}',
                'signup_date': str(now),
                'company_name': 'Liberty Mutual',
                'num_employees': 100
            }
        )
        if result['ResponseMetadata'].get('HTTPStatusCode') == 200:
            # now, create the first employee
            # create an SQS message and sent the companyId and the employee details to the lambda to create the result
            employeeData = SQSMessage(str(companyId), 'Joao', 'Romao', 'test@mail.com', '0986712348')

            response = queue.send_message(MessageBody=str(employeeData))

    except ValueError:
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
