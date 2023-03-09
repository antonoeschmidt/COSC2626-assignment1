'''
Created Date: Thursday, March 9th 2023, 3:22:52 pm
Author: Anton Østergaard Schmidt, s3892062
Copyright (c) 2023

Description:
Python script to create a new table in DynamoDB.
The script uses the boto3 library to create a new table in DynamoDB.
The table has a partition key of title and a sort key of artist.
Furthermore, the scripts needs an attribute definition array, in order for the
table to be created.
The ProvisionedThroughput is sat to 5 in both read and write, as it seems standard.

'''

import boto3

dynamodb = boto3.client('dynamodb')

# Define table name, key schema and attributes
table_name = 'music'
key_schema = [
    {
        'AttributeName': 'title',
        'KeyType': 'HASH'
    },
    {
        'AttributeName': 'artist',
        'KeyType': 'RANGE'
    },
]
attribute_definitions = [
    {
        'AttributeName': 'title',
        'AttributeType': 'S'
    },
    {
        'AttributeName': 'artist',
        'AttributeType': 'S'
    }
]

# Create the table
dynamodb.create_table(
    TableName=table_name,
    KeySchema=key_schema,
    AttributeDefinitions=attribute_definitions,
    ProvisionedThroughput={
        'ReadCapacityUnits': 5,
        'WriteCapacityUnits': 5
    }
)

# Wait for the table to be created
waiter = dynamodb.get_waiter('table_exists')
waiter.wait(TableName=table_name)

print(f"Table '{table_name}' created successfully.")