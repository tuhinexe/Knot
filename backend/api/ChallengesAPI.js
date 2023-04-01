const Challenges = require("../models/Challenges");

const fetchChallenges = async () => {
  const challenges = await Challenges.find({})
    .sort({ timestamp: -1 })
    .populate("creatorId")
    .exec();
  return challenges;
};

const createChallenges = async (challengeData) => {
  try {
    const challenge = new Challenges(challengeData);
    await challenge.save();
    return challenge;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const fetchOneChallenge = async (challengeId) => {
  try {
    const challenge = await Challenges.findOne({ _id: challengeId })
      .populate("creatorId")
      .populate("participators")
      .exec();
    return challenge;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

const participateInChallenge = async(challengeId, userId)=>{
  try {
    const challenge = await Challenges.findOne({ _id: challengeId });
    if (challenge.participators.includes(userId)) {
      throw new Error(`You have already participated`);
    }
    const resultOfParticipation = await Challenges.updateOne(
      { _id: challengeId },
      { $addToSet: { participators: userId } }
    );
    return resultOfParticipation;
  } catch (error) {
    throw new Error(error.message);
  }
}


module.exports = { fetchChallenges, createChallenges, fetchOneChallenge, participateInChallenge };
