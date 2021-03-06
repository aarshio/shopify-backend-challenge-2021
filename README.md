# Shopify Backend Challenge

> Demo at https://shopify-backend-fall.herokuapp.com/ (NOTE: that it will take some time to load the first time, since I'm using the free version of heroku)

> Sample Image Upload https://shopify-backend-fall.herokuapp.com/uploads/2021-04-29T20:45:50.076Zcat.jpeg

The following is an API that lets you post your favourite images to the cloud.

# Local Requirements
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
URI //Mongo db server URI "mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/test?retryWrites=true&w=majority"
```
To install packages run, `npm install` in the root directory, and `npm start` to run the API.
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


* `POST /add/image` [Requires: user_id (string), title (string), contentImage] [Optional: private (boolean)] -> Returns post (object)

Sample `POST /add/image`
![alt text](https://i.imgur.com/3lpvKJ6.png "Title")

## Testing

To run tests, simply run `npm test`. There are currently 7 tests. Tests that involve registering a new user adds a new test user to the database.
![alt text](https://i.imgur.com/H1bW3cC.png "Title")

## Requirements
https://docs.google.com/document/d/1ZKRywXQLZWOqVOHC4JkF3LqdpO3Llpfk_CkZPR8bjak/edit#heading=h.n7bww7g70ipk
