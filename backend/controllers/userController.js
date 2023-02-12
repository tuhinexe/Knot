const express = require("express");
const User = require("../models/Users");
const create_newUser = require("../api/createUser");
const passport = require("passport");
passport.use(User.createStrategy());
const signUpRender = (req, res) => {
  res.render("signUp");
};

const signUpController = async (req, res) => {
  const userData = {
    firstname: "raj",
    lastname: "dk",
    username: "mehra",
    email: "random@random.com"
  }
  User.register(userData, "blah", (err, user) => {
    if (err) {
      console.log(err);
      res.redirect('/signup');
    } else {
      passport.authenticate("local")(req, res, () => {
        console.log("signed up");
        res.redirect("/profile");
      });
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
