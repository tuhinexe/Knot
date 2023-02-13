const express = require("express");
const User = require("../models/Users");
const passportSetup = require("../config/passportConfig");
const passport = require("passport");

const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const signUpRender = (req, res) => {
  res.render("signUp");
};

// make a local mongoose strategy
passport.use(User.createStrategy());

//serialize and deserialize user
passport.serializeUser((user, done) => {
  console.log("serialized user");
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

const signUpController = (req, res) => {
  const userData = {
    firstname: "raj",
    lastname: "dk",
    username: "heyy",
    email: "random@random.com",
  };
  User.register(userData, "bhadwa", (err, user) => {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      console.log("heree");
      console.log(user.username);
      passport.authenticate("local", { failureRedirect: "/login" })(
        req,
        res,
        () => {
          console.log(req.user);
          res.redirect("/profile");
        }
      );
    }
  });
};

const loginRender = (req, res) => {
  res.render("login");
};

const loginController = async (req, res) => {
  console.log("signed up");
  res.redirect("/login");
};

module.exports = {
  signUpController,
  signUpRender,
  loginController,
  loginRender,
};
