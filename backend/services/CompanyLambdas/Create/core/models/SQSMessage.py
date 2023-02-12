import json
class SQSMessage:
    def __init__(self, company_id: str,first_name: str, last_name: str, email_address:str, phone_number: str):
        self.company_id = company_id
        self.first_name = first_name
        self.last_name = last_name
        self.email_address = email_address
        self.phone_number = phone_number

    def __call__(self):
        print("Hello, I am a student.")



    def __str__(self):
        return json.dumps(self.__dict__)


