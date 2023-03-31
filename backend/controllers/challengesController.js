const findUser = require("../api/findUser");
const challengesModel = require("../models/Challenges");
const challengesAPI = require("../api/ChallengesAPI");
// const {voteCount} = require("../api/pollsApi");

const challengesRender = async (req, res) => {
  const pageInfo = {
    title: "Knot - Challenges",
    pagename: "challenges",
    profilePic: req.user.profilePic_url,
    userId: req.user._id,
  };
  try {
    const challenges = await challengesAPI.fetchChallenges();
    // const challengesDate = challenges.map((challenge) => 
    //     new Date(challenge.duration).toLocaleDateString() );
    res.render('challenges', { challenges, pageInfo: pageInfo });
  } catch (err) {
    console.log(err);
    res.send([]);
  }
};

const createChallengeRender = async (req, res) => {
  const pageInfo = {
    user: req.user,
    title: "Knot - New Challenge",
    pagename: "add challenge",
    profilePic: req.user.profilePic_url,
  };
  res.render("addChallenge", { pageInfo: pageInfo });
};

const createChallengeController = async (req, res) => {
  const challengeData ={
    creatorId: req.user._id,
    content: req.body.content,
    description: req.body.desc,
    duration: req.body.duration
  }
  try {
    await challengesAPI.createChallenges(challengeData);
    res.redirect("/challenges");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  challengesRender,
  createChallengeRender,
  createChallengeController,
};
