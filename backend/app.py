'''
Created Date: Thursday, March 9th 2023, 9:10:01 pm
Author: Anton Østergaard Schmidt, s3892062
Copyright (c) 2023
'''

from flask import Flask, jsonify, request
from flask_cors import CORS
import boto3

app = Flask(__name__)
CORS(app)

dynamodb = boto3.client('dynamodb', region_name='us-east-1')

@app.route('/')
def hello():
    return 'Hello world'

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email, password = data['email'], data['password']
    table_name = 'login'

    try:
        response = dynamodb.get_item(
        TableName=table_name,
        Key={
            'email': {'S': email},
        })
        if 'Item' not in response:
            return jsonify({'message': 'Email or password is invalid”'}), 401
        
        item = response['Item']
        if email == item['email']['S'] and password == item['password']['S']:
            user = {'email': item['email']['S'], 'username': item['user_name']['S']}
            return jsonify({'message': 'Login successful', 'user': user}), 200
        
        return jsonify({'message': 'Email or password is invalid'}), 401

    except:
        print('Error getting data')
        return jsonify({'message': 'Error getting data'}), 401


@app.route("/register", methods=['POST'])
def register():
    data = request.get_json()
    email, password, username = data['email'], data['password'], data['username']
    table_name = 'login'

    try:
        response = dynamodb.get_item(
        TableName=table_name,
        Key={
            'email': {'S': email},
        })
        if 'Item' in response:
            return jsonify({'message': 'Email already exists”'}), 200
        
        response = dynamodb.put_item(
            TableName=table_name,
            Item= {
        'email': {'S': email},
        'user_name': {'S': username},
        'password': {'S': password}
            }
        )

        return jsonify({'message': 'New user registered”'}), 200


    except:
        print('Error getting data')
        return jsonify({'message': 'Error getting data'}), 500


@app.route("/music")
def get_music():
    table_name = 'music'

    response = dynamodb.scan(
        TableName=table_name
    )

    return jsonify(response)




if __name__ == '__main__':
    app.run()



