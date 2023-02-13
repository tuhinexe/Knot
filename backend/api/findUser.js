
const userModel = require("../models/Users");

async function findUser(user) {
  const userFound = await userModel.findById(user._id).populate("posts").exec();
  if (userFound) {
    return userFound;
  } else {
    console.log("user not found");
  }
}

module.exports = findUser;


