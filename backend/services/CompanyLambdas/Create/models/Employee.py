import json
class Employee:
    def __init__(self, first_name: str, last_name: str, email_address:str, phone_number: str):
        self.first_name = first_name
        self.last_name = last_name
        self.email_address = email_address
        self.phone_number = phone_number

    def __str__(self):
        return json.dumps(self.__dict__)


