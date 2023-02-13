const express = require("express");
const User = require("../models/Users");
const passportSetup = require("../config/passportConfig");
const passport = require("passport");


const signUpRender = (req, res) => {
  res.render("signUp");
};


const signUpController = (req, res) => {
  const userData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
  };
  User.register(userData, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local", { failureRedirect: "/login" })(
        req,
        res,
        () => {
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
