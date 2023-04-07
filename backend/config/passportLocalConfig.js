const passportSetup = require("../config/passportConfig");
const passport = require("passport");
const User = require("../models/Users");

const initializeSignup = async (userData, password, req, res) => {
  try{
    User.register(userData, password, (err, user) => {
      if (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
      } else {
        passport.authenticate("local", {
          successRedirect: "/",
          successFlash: "Welcome to Knot!",
          failureRedirect: "/signup",
          failureFlash: true,
        })(req, res)
      }
    });
  } catch(err){
    req.flash("error", err.message);
    console.log(err);
  }
};

module.exports = initializeSignup;