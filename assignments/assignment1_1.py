'''
Created Date: Wednesday, March 8th 2023, 1:22:02 pm
Author: Anton Østergaard Schmidt, S3892062
Copyright (c) 2023

Description:
The following code is an AWS Lambda Function that populates an already
exisiting table 'login'.
The function generates the 10 entries for the DynamoDB using a method
'item_generator' combined with a for loop.
After each item generation, the boto3 library is used to put an item in the DB.
'''

import json
import boto3
from botocore.exceptions import ClientError

def lambda_handler(event, context):    
    dynamodb = boto3.client('dynamodb')
    table_name = 'login'
    
    for i in range(10):
        res = ""
        item = item_generator(i)
    
        try:
            response = dynamodb.put_item(
                TableName=table_name,
                Item=item
            )
            print("PutItem succeeded:", response)
            res = "success"
            
        except ClientError as e:
            print("PutItem failed:", e)
            res = "failed"
        
    
    return {
        'statusCode': 200,
        'body': json.dumps(f'Hello from Lambda! Res: {res}')
    }

def item_generator(i: int):
    password = "012345678901234567890123456789"
    
    item = {
        'email': {'S': f's3892062{str(i)}@student.rmit.edu.au'},
        'user_name': {'S': f'antonschmidt{str(i)}'},
        'password': {'S': f'{password[i:i+6]}'}
    }
    
    return item
    