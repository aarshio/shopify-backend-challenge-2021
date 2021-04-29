const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer({
  dest: "./uploads/",
});
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

//Models
const User = require("./models/user");
const Post = require("./models/post");

//ENV
const PORT = process.env.PORT;
const SECRET = process.env.SECRET;
// const CORS_ORIGIN = process.env.CORS_ORIGIN; //client url
const URI = process.env.URI;

const app = express();

//Mongoose
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

//Middleware

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// for parsing multipart/form-data
// app.use(upload.array());

app.use(
  session({
    secret: SECRET,
    resave: true,
    saveUnititialized: true,
  })
);

app.use(cookieParser(SECRET));
app.use(passport.initialize());
app.use(passport.session());
require("./auth");

// Routes

app.get("/", (req, res) => {
  res.send("Shopify back end challenge. Made with ❤️ by https://aarsh.io");
});

// User Routes
const isLoggedIn = (req, res, next) => {
  if (req.user) next();
  else res.sendStatus(401);
};

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
        res.send(req.user);
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
      req.logIn(newUser, (err) => {
        if (err) throw err;
      });
    }
  });
});

app.get("/auth", (req, res) => {
  if (req.user) res.send(req.user);
  else res.sendStatus(401);
});

// Post Routes

app.post(
  "/add/image",
  // isLoggedIn,
  upload.single("contentImage"),
  (req, res) => {
    console.log(req.file);
    // const newPost = new Post({
    //   user_id: req.body.user_id,
    //   title: req.body.title,
    //   content: req.body.content,
    // });
    // newPost.save();
    // res.send(newPost);
  }
);

app.get("/get/images", async (req, res) => {
  const posts = await Post.find();
  return res.send(posts);
});

// start server
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
