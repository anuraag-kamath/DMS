Clone the repository using:-

git clone https://<>@bitbucket.org/m4vr1ck/dms.git

Go to the directory where the repository where the code is cloned.

Set process environment variable before proceeding:- WINDOWS:- 

set DMS_PORT=12003

set DMS_MONGODB_URL=mongodb://localhost:27017/dms

Once the variable is set, the server can be then started using either node app.js or nodemon app.js or pm2 start app.js --name dms
