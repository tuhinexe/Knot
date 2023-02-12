const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/Users");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("GoogleStrategy");
      console.log(profile);
    }
  )
);
