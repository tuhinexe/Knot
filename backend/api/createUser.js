const mongoose = require("mongoose");
const userModel = require("../models/Users");
const postModel = require("../models/Posts");

async function create_newUser() {
  const user = new userModel({
    firstname: "Tuhin",
    lastname: "Das",
    username: "tuhinlund",
    email: "random@random.com",
  });
  try {
    await user.save();
    console.log("user saved");
  } catch (err) {
    console.log(err);
  }
  const posts = await postModel.find();
  try {
    console.log(posts);
  } catch (err) {
    console.log(err);
  }
}

module.exports = create_newUser;









