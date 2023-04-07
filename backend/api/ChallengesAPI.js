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
    await Promise.all([await challenge.save(), User.updateOne(
      { _id: userId },
      { 
        $push: { participatedChallenges: challenge._id },
        $addToSet: { challenges: challenge._id },
        $inc: { points: 5 }
      }
    )])
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
    const challengeCreator = await User.findById(challenge.creatorId);
    challengeCreator.points += 2;
    const foundUserPromise = User.updateOne({ _id: userId }, { $addToSet: { participatedChallenges: challengeId } });
    const [user, resultOfParticipation] = await Promise.all([foundUserPromise, participatePromise, challengeCreator.save()]);
    return resultOfParticipation;
  } catch (error) {
    throw new Error(error.message);
  }
}

const deleteChallenge = async (challengeId, user) => {
  try {
    await Challenges.findByIdAndDelete(challengeId);    
    user.challenges.pull(challengeId)
    user.points -= 5;
    await user.save();
    }catch{
        console.log(err);
    }
}


module.exports = { fetchChallenges, createChallenges, fetchOneChallenge, participateInChallenge, deleteChallenge };


// const userPromise = User.findById(userId);
//   const challengesPromise = Challenge.find({ participants: userId }).sort({
//     createdAt: -1
//   });
//   const [user, challenges] = await Promise.all([userPromise, challengesPromise]);