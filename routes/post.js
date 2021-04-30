const express = require("express");
const app = express.Router();
const SERVER_URL = process.env.SERVER_URL;
const Post = require("../models/post");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./uploads"),
  filename: (req, file, cb) =>
    cb(null, new Date().toISOString() + file.originalname),
});
var upload = multer({
  storage: storage,
});

const isLoggedIn = (req, res, next) => {
  if (req.user) next();
  else res.sendStatus(401);
};

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

module.exports = app;
