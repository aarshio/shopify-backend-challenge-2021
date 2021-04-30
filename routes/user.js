const express = require("express");
const app = express.Router();
const _ = require("lodash");
const User = require("../models/user");
const passport = require("passport");

app.get("/logout", (req, res) => {
  req.logout();
  res.send("logged out");
});

app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No user exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.status(200).send(_.omit(req.user._doc, "password"));
      });
    }
  })(req, res, next);
});

app.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User exists");
    if (!doc) {
      const newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
      });
      await newUser.save();
      res.send(_.omit(newUser._doc, "password"));
    }
  });
});

app.get("/auth", (req, res) => {
  if (req.user) res.send(_.omit(req.user._doc, "password"));
  else res.sendStatus(401);
});

module.exports = app;
