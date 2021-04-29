# Shopify Backend Challenge

> Demo at TODO: ADD

The following is an API that lets you post your favourite images to the cloud.

# Requirements
In order to run the API locally, you must have the following enviroment variables in `.env` in the root directory, 
```
PORT //i.e port 5000
```
```
SECRET //API secret key
```
```
SERVER_URL //i.e http://localhost:5000/
```
```
URI //Mongo db server URI "mongodb+srv://USERNAME:PASSWORD@CLUSTER-wcjrp.mongodb.net/test?retryWrites=true&w=majority"
```
To install packages run, `npm install` in the root directory.
## Open Endpoints

Open endpoints require no Authentication.

* `GET /auth/` -> If auth, returns user (object), else returns unauthorized (string)
* `GET /get/images` -> Returns list of all images (array)
* `POST /register` [Requires: email (string), username (string), password (string)] -> Returns user (object)
* `POST /login` [ Requires: username (string), password (string)] -> Returns user (object)
* `GET /logout`  -> Returns status (string)

Sample `POST /register` 
![alt text](https://i.imgur.com/Gn2dAkQ.png "Title")

## Endpoints that require Authentication (must login first)


* `POST /add/image` [Requires: user_id (string), title (string), contentImage] [Optional: private (boolean)]

Sample `POST /add/image`
![alt text](https://i.imgur.com/3lpvKJ6.png "Title")

