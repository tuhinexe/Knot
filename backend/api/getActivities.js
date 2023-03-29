const userModel = require("../models/Users");

async function getPolls(user) {
  const userFound = await userModel.findById(user._id).populate("polls").exec();
  if (userFound) {
    return userFound.polls.reverse();
  } else {
    console.log("polls not found");
  }
}
async function getChallenges(user) {
  const userFound = await userModel.findById(user._id).populate("challenges").exec();
  if (userFound) {
    return userFound.challenges.reverse();
  } else {
    console.log("challenges not found");
  }
}

module.exports = {getPolls, getChallenges};

