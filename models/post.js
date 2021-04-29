//const db = require('../services/dbService');
const mongoose = require("mongoose");

const post = new mongoose.Schema({
  title: { type: String, required: true, unique: false },
  content: { type: String, required: true, unique: false },
  user_id: { type: String, required: true },
  private: { type: Boolean, default: false },
  post_date: { type: Date, default: Date.now },
});

module.exports = Post = mongoose.model("Posts", post);
