const express = require("express");
const User = require("../models/Users");
const passportSetup = require("../config/passportConfig");
const initializeSignup = require("../config/passportLocalConfig");
const initializeLogin = require("../config/loginConfig");
const passport = require("passport");


const signUpRender = (req, res) => {
  res.render("signUp");
};

const signUpController = async (req, res) => {
  const userData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
  };
  await initializeSignup(userData, req.body.password, req, res);
};

const loginRender = (req, res) => {
  res.render("login");
};

const loginController = async (req, res) => {
  const userData = {
    username: req.body.username,
    password: req.body.password
  }
  await initializeLogin(userData, req, res);
};

module.exports = {
  signUpController,
  signUpRender,
  loginController,
  loginRender,
};
