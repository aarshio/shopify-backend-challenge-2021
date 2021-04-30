const express = require("express");
const app = express.Router();
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const SECRET = process.env.SECRET;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(cookieParser(SECRET));
app.use(passport.initialize());
app.use(passport.session());
require("./auth");

module.exports = app;
