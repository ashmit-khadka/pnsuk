###Repo:
https://bitbucket.org/a-khadka/pnsuk-react/src/master/
a0khadka - S6
ATBBAXcrQ3DyCC4745xBkT9EucaPAA69ACAB


##DI
ashmit.khadka@hotmail.com - Society@07

##DI Droplet
161.35.165.251
root - Society@7

##IONIS
627894591 - 627894591

#Admin
https://pnsuk.org:8000/admin
superuser
Society@70

#Email
https://mail.ionos.co.uk/
nepalisociety@pnsuk.org


###Development
##Frontend
npm install && npm run start
##Backend
python -m venv env
cd env/Scripts
.\activate
pip install -r requirements.txt
python manage.py runserver


###Production
##Frontend
npm run build

##Backend
gunicorn --bind 0.0.0.0:8000 pnsuk  
pm2 start "gunicorn --certfile=/www/pnsuk-react/ssl/pnsuk.org_ssl_certificate.cer --keyfile=/www/pnsuk-react/ssl/pnsuk.org_private_key.key --bind 0.0.0.0:8000 pnsuk.wsgi" --name API


#Nginx
server {
   listen 80 default_server;
   root /www/pnsuk-react/frontend/build;
   server_name pnsuk.org;
   index index.html index.htm;
   location / {
     try_files $uri /index.html;
   }
}


#Nginx
server {
	listen 80 default_server;
	listen [::]:80 default_server;
	server_name _;
	return 301 https://$host$request_uri;
}

server {
    listen 443;
    ssl on;
    ssl_certificate /www/pnsuk-react/ssl/pnsuk.org_ssl_certificate.cer;
    ssl_certificate_key /www/pnsuk-react/ssl/pnsuk.org_private_key.key;
    root /www/pnsuk-react/frontend/build;
    server_name pnsuk.org;
    index index.html index.htm;
}

Email
nepalisociety
@Society2007



----------------------------------------------------------


server {
        listen 80 default_server;
        listen [::]:80 default_server;
        server_name _;
        return 301 https://$host$request_uri;
}

server {
    listen 443;
    ssl on;
    ssl_certificate /signreq.csr;
    ssl_certificate_key /certificate.pem;
    root /www/pnsuk-react/frontend/build;
    server_name pnsuk.org;
    index index.html index.htm;
}

certificate.pem  key.pem  signreq.csr  www
