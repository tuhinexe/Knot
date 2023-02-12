
const userModel = require("../models/Users");

async function findUser({user}) {
  const userFound = await userModel.findOne({username: user.username});
  if (userFound) {
    console.log("user found");
    return userFound;
  } else {
    console.log("user not found");
  }
}

module.exports = findUser;