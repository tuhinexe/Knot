const express = require("express");


const signUpRender = (req, res) => {
  res.render("signUp");
};

const signUpController = async (req, res) => {
  console.log("signed up");
  res.redirect("/login");
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
