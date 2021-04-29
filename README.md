# Shopify Backend Challenge

The following is an API that lets you post your favourite images to the cloud.

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
Sample `POST /add/imager`
![alt text](https://i.imgur.com/3lpvKJ6.png "Title")

