const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const User = require("../models/user");

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findOne({ _id: id }, (err, user) => {
    cb(err, user);
  });
});

passport.use(
  new passportLocal((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) throw err;
      if (!user) return done(null, false);
      if (user && user.password == password) return done(null, user);
      else return done(null, false);
    });
  })
);
