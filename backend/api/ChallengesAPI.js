const Challenges = require("../models/Challenges");

const fetchChallenges = async () => {
  const challenges = await Challenges.find({})
    .sort({ timestamp: -1 })
    .populate("creatorId")
    .exec();
  return challenges;
};

const createChallenges = async (challengeData) => {
    try{
        const challenge = new Challenges(challengeData);
        await challenge.save();
        return challenge;
    }catch(err){
        console.log(err);
        throw new Error(err);
    }
};

module.exports = { fetchChallenges, createChallenges };
