const express = require("express");
const User = require("../models/Users");
const passportSetup = require("../config/passportConfig");
const initializeSignup = require("../config/passportLocalConfig");
const initializeLogin = require("../config/loginConfig");
const initializeLogout = require("../config/logoutConfig");



const signUpRender = (req, res) => {
  res.render("signUp", {pageTitle: 'Knot - Sign Up'});
};

const signUpController = async (req, res) => {
  const userData = {
    firstname: req.body.firstname.replace(/\s/g, ""),
    lastname: req.body.lastname.replace(/\s/g, ""),
    username: req.body.username.replace(/\s/g, ""),
    email: req.body.email,
    bio: "",
    profilePic_url: `https://api.dicebear.com/5.x/lorelei-neutral/svg?seed=${req.body.username}&backgroundColor=ffffff,b6e3f4&backgroundType=gradientLinear`,
  };
  await initializeSignup(userData, req.body.password, req, res);
};


const loginRender = (req, res) => {
  res.render("login",{pageTitle: 'Knot - Login'});
};

const loginController = async (req, res) => {
  const userData = {
    username: req.body.username,
    password: req.body.password
  }
  await initializeLogin(userData, req, res);
};

const logoutController = (req, res) => {
  initializeLogout(req, res);
};

module.exports = {
  signUpController,
  signUpRender,
  loginController,
  loginRender,
  logoutController
};
