const express = require('express');
const app = express();



const signUpRender = (req, res) => {
    res.render("signUp");
}

const signUpController = async (req, res) => {
    console.log("signed up");
    res.redirect("/login");
}

module.exports = {
    signUpController,
    signUpRender
}
