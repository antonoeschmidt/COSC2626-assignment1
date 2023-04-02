'''
Created Date: Monday, March 27th 2023, 4:48:27 pm
Author: Anton Østergaard Schmidt
Copyright (c) 2023
'''

import boto3
import json

dynamodb = boto3.client('dynamodb')

def lambda_handler(event, context):
    path_str = event["path"]
    
    path_arr = path_str.split("/")
    endpoint = path_arr[len(path_arr)-1]
    
    if endpoint == 'login':
        body = json.loads(event['body'])
        
        email = body['email']
        password = body['password']
        table_name = 'login'
        
        try:
            response = dynamodb.get_item(
                TableName=table_name,
                Key={
                    'email': {'S': email},
                })
            
            if 'Item' not in response:
                return {'statusCode': 401, 'body': json.dumps({'message': 'Email or password is invalid'})}
            
            item = response['Item']
            if email == item['email']['S'] and password == item['password']['S']:
                if 'subs' in item:
                    user = {'email': item['email']['S'], 'username': item['user_name']['S'], 'subs': item['subs']['SS']}
                else:
                    user = {'email': item['email']['S'], 'username': item['user_name']['S']}
                    
                return {'statusCode': 200, 'body': json.dumps({'message': 'Login successful', 'user': user})}
            
            return {'statusCode': 402, 'body': json.dumps({'message': 'Email or password is invalid'})}
    
        except Exception as e:
            print(f'Error getting data: {e}')
            return {'statusCode': 403, 'body': json.dumps({'message': 'Error getting data'})}
            
    elif endpoint == 'register':
        body = json.loads(event['body'])
        email, password, username = body['email'], body['password'], body['username']
        table_name = 'login'
        try:
            response = dynamodb.get_item(
            TableName=table_name,
            Key={
                'email': {'S': email},
            })
            if 'Item' in response:
                return  {'statusCode': 200, 'body': json.dumps({'message': 'Email already exists'})}
            
            response = dynamodb.put_item(
                TableName=table_name,
                Item= {
            'email': {'S': email},
            'user_name': {'S': username},
            'password': {'S': password}
                }
            )
    
            return  {'statusCode': 200, 'body': json.dumps({'message': 'New user registered'})}
    
        except:
            print('Error getting data')
            return  {'statusCode': 500, 'body': json.dumps({'message': 'Error getting data'})}
    
    elif endpoint == 'user':
        body = json.loads(event['body'])
        subs, email = body['subs'], body['email']
        update_expression = 'SET subs = :new_value'
        expression_attribute_values = {':new_value': {'SS': subs}}
    
        response = dynamodb.update_item(
            TableName='login',
            Key={
                'email': {'S': email},
            },
            UpdateExpression=update_expression,
            ExpressionAttributeValues=expression_attribute_values
        )
        
        return {'statusCode': 200, 'body': json.dumps({'message': 'Subscribed'})}
    
    elif endpoint == 'music':
        
        table_name = 'music'
        response = dynamodb.scan(
            TableName=table_name
        )
        return {'statusCode': 200, 'body': json.dumps({'message': response})}
        
    else:
        return {'statusCode': 404, 'body': json.dumps({'message': 'Endpoint not found'})}

                
        
    