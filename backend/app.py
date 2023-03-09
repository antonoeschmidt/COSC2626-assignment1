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

dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
table = dynamodb.Table('login')

@app.route('/login', methods=['POST'])
def login():
    login_data = request.get_json()
    print(login_data)
    email = login_data['email']
    password = login_data['password']

    try:
        user_data = table.get_item(Key={'email': email})
    except:
        return jsonify({'message': 'Invalid credentials'}), 401

    if password == user_data['Item']['password']:
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/items', methods=['GET'])
def get_items():
    items = table.scan()['Items']
    return jsonify(items)

@app.route('/items', methods=['POST'])
def create_item():
    item = request.get_json()
    table.put_item(Item=item)
    return jsonify(item)

if __name__ == '__main__':
    app.run()



