const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/Users");

passport.use(User.createStrategy());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

const generateRandomUsername = async (user) => {
  const uniqueUserName = await User.findOne({ username: user })
  if (!uniqueUserName) {
    return user
  }
  const prefix = user
  const suffix = Math.floor(Math.random() * 10000); 
  const username = `${prefix}${suffix}`;
  const foundUser = await User.findOne({ username });
  if (foundUser) {
    return generateRandomUsername();
  }
  return username;
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const randomProfileTheme = ["lorelei", "personas", "fun-emoji", "avataaars", "adventurer", "big-ears"]
      const userData = {
        googleId: profile.id,
        username: await generateRandomUsername(profile._json.email.split("@")[0]),
        firstname: profile.name.givenName,
        lastname: profile.name.familyName,
        email: profile._json.email,
        bio: "",
        profilePic_url: `https://api.dicebear.com/5.x/${randomProfileTheme[Math.floor(Math.random()*randomProfileTheme.length)]}/svg?seed=${profile.id}&backgroundColor=ffffff,b6e3f4&backgroundType=gradientLinear`,
      };
      User.findOne({ googleId: profile.id }, function (err, user) {
        if (user) {
          return done(err, user);
        } else {
          User.create(userData, function (err, user) {
            return done(err, user);
          });
        }
      });
    }
  )
);
