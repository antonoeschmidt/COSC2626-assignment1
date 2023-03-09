'''
Created Date: Thursday, March 9th 2023, 7:06:11 pm
Author: Anton Østergaard Schmidt, s3892062
Copyright (c) 

Description:
In this script, we are getting all images listed in the a1.json file.
The images are listed as URLs, which we are getting using an HTTP request in Python.
If we get a successful GET-request, we are then trying to upload the content
of the file into our S3 bucket.
'''

import requests
import boto3
import json
import re
import io

s3 = boto3.client('s3', region_name='us-east-1')
bucket_name = 's3892062-artist-images'

# Get all image urls from the a1.json file
with open('a1.json') as f:
    data = json.load(f)

songs = data['songs']

for song in songs:
    image_url = song['img_url']
    match = re.search(r"/([^/]+\.(jpg|jpeg))$", image_url) # Match using regex, to extract the file name only
    image_name = match.group(1) if match else image_url # If we find a match, we are using that as the file name. If not, we use the URL

    response = requests.get(image_url)
    if response.status_code == 200: # We are only interested in the content if we get a 200 status code
        try:
            s3.upload_fileobj(io.BytesIO(response.content), bucket_name, image_name)
            print(f"Uploaded {image_name} to S3 bucket {bucket_name}")
        except ValueError as e:
            print(e) 
    
    else:
        print(f"Failed to download image from {image_url}")