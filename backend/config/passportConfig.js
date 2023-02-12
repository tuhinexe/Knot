const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/Users");




passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id).then((user)=>{
        done(null, user);
    })
});
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID, 
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      const userData = {
        googleId: profile.id,
        username: profile._json.email.split("@")[0],
        firstname: profile.name.givenName,
        lastname: profile.name.familyName,
        email: profile._json.email,
      };
      User.findOrCreate(userData, function (err, user) {
        return done(err, user);
      });
    }
  )
);
