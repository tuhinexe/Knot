const userModel = require("../models/Users");

async function findPosts(user) {
  const userFound = await userModel.findById(user._id).populate("posts").exec();
  if (userFound) {
    return userFound.posts.reverse();
  } else {
    console.log("posts not found");
  }
}

module.exports = findPosts;

