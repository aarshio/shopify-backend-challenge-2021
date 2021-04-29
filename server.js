const express = require("express");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const multer = require("multer");
var _ = require("lodash");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) =>
    cb(null, new Date().toISOString() + file.originalname),
});
var upload = multer({
  storage: storage,
});

dotenv.config();

//Models
const User = require("./models/user");
const Post = require("./models/post");

//ENV
const PORT = process.env.PORT;
const SECRET = process.env.SECRET;
const SERVER_URL = process.env.SERVER_URL;
const URI = process.env.URI;

const app = express();

//Mongoose
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });

//Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

// Make uploads public
app.use("/uploads", express.static("uploads"));

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
        res.send(_.omit(req.user._doc, "password"));
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

// Post Routes

app.post(
  "/add/image",
  isLoggedIn,
  upload.single("contentImage"),
  (req, res) => {
    const newPost = new Post({
      user_id: req.body.user_id,
      title: req.body.title,
      contentImage: SERVER_URL + req.file.path,
      private: req.body.private ? req.body.private : false,
    });
    newPost.save();
    res.send(newPost);
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
