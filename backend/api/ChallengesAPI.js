const Challenges = require("../models/Challenges");
const User = require("../models/Users");

const fetchChallenges = async () => {
  const challenges = await Challenges.find({})
    .sort({ timestamp: -1 })
    .populate("creatorId")
    .exec();
  return challenges;
};

const createChallenges = async (challengeData, userId) => {
  try {
    const challenge = new Challenges(challengeData);
    await challenge.save();
    await User.updateOne(
      { _id: userId },
      { 
        $push: { participatedChallenges: challenge._id },
        $addToSet: { challenges: challenge._id }
      }
    );
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
    const participatePromise = Challenges.updateOne(
      { _id: challengeId },
      { $addToSet: { participators: userId } }
    );
    const foundUserPromise = User.findOne({ _id: userId });
    const [user, resultOfParticipation] = await Promise.all([foundUserPromise, participatePromise]);
    user.participatedChallenges.push(challengeId);
    return resultOfParticipation;
  } catch (error) {
    throw new Error(error.message);
  }
}


module.exports = { fetchChallenges, createChallenges, fetchOneChallenge, participateInChallenge };


// const userPromise = User.findById(userId);
//   const challengesPromise = Challenge.find({ participants: userId }).sort({
//     createdAt: -1
//   });
//   const [user, challenges] = await Promise.all([userPromise, challengesPromise]);