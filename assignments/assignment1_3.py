'''
Created Date: Thursday, March 9th 2023, 7:06:11 pm
Author: Anton Østergaard Schmidt, s3892062
Copyright (c) 

Description:
The scripts loads the json file into an array, which is then parsed into an
array containing all songs.
The the boto3 library is used to put one item into the music table
one at a time. A bulk operation might have been more optimised.
'''

import boto3
from botocore.exceptions import ClientError
import json

dynamodb = boto3.client('dynamodb')
with open('a1.json') as f:
    data = json.load(f)

songs = data['songs']

# Iterate over the songs and put each item into the table
for item in songs:
    items_added = 0
    print(item['title'])

    try:
        dynamodb.put_item(
            TableName='music',
            Item={
                'title': {'S': item['title']},
                'artist': {'S': item['artist']},
                'year': {'N': str(item['year'])},
                'web_url': {'S': item['web_url']},
                'img_url': {'S': item['img_url']}
            }
        )
        items_added += 1

    except ClientError as e:
         print("PutItem failed:", e)

print(f'{items_added} items added out of {len(songs)} items in file')
