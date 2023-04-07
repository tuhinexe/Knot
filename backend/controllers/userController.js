const express = require("express");
const User = require("../models/Users");
const passportSetup = require("../config/passportConfig");
const initializeSignup = require("../config/passportLocalConfig");
const initializeLogin = require("../config/loginConfig");
const initializeLogout = require("../config/logoutConfig");



const signUpRender = (req, res) => {
  res.render("signup", {pageTitle: 'Knot - Sign Up', messages: req.flash()});
};

const signUpController = async (req, res) => {
  const randomProfileTheme = ["lorelei", "personas", "fun-emoji", "avataaars", "adventurer", "big-ears"]
  const userData = {
    firstname: req.body.firstname.replace(/\s/g, ""),
    lastname: req.body.lastname.replace(/\s/g, ""),
    username: req.body.username.replace(/\s/g, ""),
    email: req.body.email,
    bio: "",
    profilePicId: "",
    profilePic_url: `https://api.dicebear.com/5.x/${randomProfileTheme[Math.floor(Math.random()*randomProfileTheme.length)]}/svg?seed=${req.body.username}&backgroundColor=ffffff,b6e3f4&backgroundType=gradientLinear`,
  };
  try{

    await initializeSignup(userData, req.body.password, req, res);
  } catch(err){
    req.flash("error", err.message);
    console.log(err);
  };
};


const loginRender = (req, res) => {
  res.render("login",{pageTitle: 'Knot - Login', messages: req.flash()});
};

const loginController = async (req, res) => {
  const userData = {
    username: req.body.username,
    password: req.body.password
  }
  try{
    
    await initializeLogin(userData, req, res);
  } catch(err){
    req.flash("error", err.message);
    console.log(err);
  };
};

const logoutController = (req, res) => {
  initializeLogout(req, res);
};
const forgotPasswordController = (req, res) => {
  req.flash("warning", "We are working on this feature.");
  res.redirect("/login");
};
module.exports = {
  signUpController,
  signUpRender,
  loginController,
  loginRender,
  logoutController,
  forgotPasswordController
};
