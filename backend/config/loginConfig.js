const passportSetup = require("../config/passportConfig");
const passport = require("passport");
const User = require("../models/Users");

const initializeLogin = async (userData, req, res) => {
  const user = new User({
    username: userData.username,
    password: userData.password,
  });

  req.login(user, (err) => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, () => {
        console.log("logged in: " + req.user);
        res.redirect("/profile");
      });
    }
  });
};

module.exports = initializeLogin;
