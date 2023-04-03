const userModel = require("../models/Users");

async function getActivities(user) {
  try {
    const userFound = await userModel.findById(user._id).populate("polls").populate("challenges").populate({
      path: "participatedChallenges",
      populate: {
        path: "creatorId",
        model: "User"
      }
    }).exec();
    if (userFound) {
      const combined = [...userFound.polls, ...userFound.challenges, ...userFound.participatedChallenges];
      const sorted = combined.sort((a, b) => b.timestamp - a.timestamp);
      let uniqueArray = sorted
        .filter((value, index, array) => array.findIndex(obj => String(obj._id) === String(value._id)) === index);
      const totalVotes = uniqueArray.map(poll => {
        if (!poll.options) {
          return null;
        }
        return poll.options.reduce((acc, option) => {
          return acc + option.voted_by.length;
        }, 0);
      });
     
      return [uniqueArray, totalVotes];
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw new Error(error);
  }

}

module.exports = getActivities;

