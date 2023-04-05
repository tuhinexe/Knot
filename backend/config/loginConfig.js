const passportSetup = require("../config/passportConfig");
const passport = require("passport");
const User = require("../models/Users");

const initializeLogin = async (userData, req, res) => {
try{
  const user = new User({
    username: userData.username,
    password: userData.password,
  });

  req.login(user, (err) => {
    if (err) {
      req.flash("error", err.message);
      res.redirect("/login");
    } else {
      passport.authenticate("local",{
        successRedirect: "/",
        successFlash: "Welcome to Knot!",
        failureRedirect: "/login",
        failureFlash: true,
      })(req, res);
    }
  });
} catch(err){
  console.log(err);
  req.flash("error", err.message);
};
};

module.exports = initializeLogin;
