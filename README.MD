# Music App

## Run with Docker Compose
Create a `.env` file in the root with the following AWS credentials `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_SESSION_TOKEN`. Then run with
```
docker-compose up
```

# AWS EC2 setup
## Client
Change the `REACT_APP_BACKEND` in the `.env` to the IP of the EC2 instance.

Then build the app
```
npm run build
```
Setup nginx on EC2
```
sudo yum install nginx
sudo amazon-linux-extras install nginx1
sudo systemctl start nginx
```
### Copy files and alter Nginx.conf
Copy files using SCP to EC2. When the build files are on the EC2, copy to and unpack the files
```
sudo cp -r build/ /var/www/html
cd /var/www/html
sudo cp -r build/* .
```
Then change the Nginx conf to:
```
root            /var/www/html;
```
And restart nginx `sudo service nginx restart`.

## Backend
Clone python project using git. Then install and run the flask app
```
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
export FLASK_APP=app.py
export FLASK_DEBUG=true
export AWS_ACCESS_KEY_ID=value
export AWS_SECRET_ACCESS_KEY=value
export AWS_SESSION_TOKEN=value
gunicorn -b 0.0.0.0:5000 app:app
```


