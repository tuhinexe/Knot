// const express = require("express");
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const passport = require("passport");
// const mongoose = require("mongoose");
const initializeUser = require("../config/passportLocalConfig"); 
// const passportLocalMongoose = require("passport-local-mongoose");

initializeUser(passport,email => {
  return User.find(user => user.email === email)
},id => {
  return User.find(user => user.id === id)
  });
const signUpRender = (req, res) => {
  res.render("signUp");
};

//make a local mongoose strategy
// passport.use(User.createStrategy());

//serialize and deserialize user
// passport.serializeUser((user, done) => {
//   console.log("serialized user");
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id).then((user) => {
//     done(null, user);
//   });
// });

const signUpController = async (req, res) => {
  const userData = {
    firstname: "raj",
    lastname: "dk",
    username: "hiiiii",
    email: "random@random.com",
    password: "ruuu",
  };
  try{
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = new User({
      firstname: userData.firstname,
      lastname: userData.lastname,
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
    });
    await user.save();
    console.log("hii")
    res.redirect("/login");
  }
  catch{
    res.redirect("/signup");
  }
 
};

const loginRender = (req, res) => {
  res.render("login");
};

const loginController = async (req, res) => {
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
};

module.exports = {
  signUpController,
  signUpRender,
  loginController,
  loginRender,
};
