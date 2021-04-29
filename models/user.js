//const db = require('../services/dbService');
const mongoose = require("mongoose");

const user = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: false, unique: true },
  password: { type: String, required: false },
  bio: { type: String, required: false, defualt:"" },
  register_date: { type: Date, default: Date.now },
});

module.exports = User = mongoose.model("Users", user);
