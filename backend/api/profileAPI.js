const User = require("../models/Users");

const searchProfile = async (searchTerm) => {
    const users = await User.find(
      {
        $or: [
          { $text: { $search: searchTerm } },
          { firstname: { $regex: searchTerm, $options: "i" } },
          { lastname: { $regex: searchTerm, $options: "i" } },
          { username: { $regex: searchTerm, $options: "i" } },
        ],
      },
      {
        score: { $meta: "textScore" },
        firstname: 1,
        lastname: 1,
        username: 1,
        profilePic_url: 1,
        _id: 1,
      }
    ).sort({ score: { $meta: "textScore" } });
    return users;
  };


  const followAndUnfollow = async (followingId, followerId) =>{
    const followerPromise = User.findById(followerId)
    const followingPromise = User.findById(followingId)
    const [follower, following] = await Promise.all([followerPromise, followingPromise])

    if(following.followers.includes(followerId)){
        following.points -= 10;
        following.followers.pull(followerId)
    } else{
        following.points += 10;
        following.followers.push(followerId)
    }

    follower.following.includes(followingId) ? follower.following.pull(followingId) : follower.following.push(followingId)
    await Promise.all([following.save(), follower.save()])
}


const getActivities = async function (user) {
  try {
    const userFound = await User.findById(user._id).populate("polls").populate("challenges").populate({
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

module.exports = {searchProfile, followAndUnfollow, getActivities};