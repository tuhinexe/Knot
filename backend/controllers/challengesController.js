const findUser = require("../api/findUser");
const challengesModel = require("../models/Challenges");
const challengesAPI = require("../api/ChallengesAPI");

const challengesRender = async (req, res) => {
  const pageInfo = {
    title: "Knot - Challenges",
    pagename: "challenges",
    profilePic: req.user.profilePic_url,
    userId: (String(req.user._id)),
  };
  try {
    const challenges = await challengesAPI.fetchChallenges();
    res.render('challenges', { challenges, pageInfo: pageInfo,  });
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
    participators: [req.user._id]
  }
  if (req.body.content !== "") {
    challengeData.content = req.body.content;
  }else{
    req.flash("error", "chalu banta hai shale... seriously ?");
    res.redirect("/challenges/add");
    return
  }
  ;
  if (req.body.desc !== "") {
    challengeData.description = req.body.desc;
  }else{
    req.flash("error", "chalu banta hai shale... seriously ?");
    res.redirect("/challenges/add");
    return
  };
  if (req.body.duration !== "") {
    challengeData.duration = req.body.duration;
  }else{
    req.flash("error", "chalu banta hai shale... seriously ?");
    res.redirect("/challenges/add");
    return
  };

  try {
    await challengesAPI.createChallenges(challengeData, req.user._id);
    res.redirect("/challenges");
  } catch (err) {
    console.log(err);
  }
};

const viewOneChallengeRender = async(req, res)=>{
  const pageInfo = {
    user: req.user,
    title: "Knot - Challenge",
    pagename: "challenge",
    profilePic: req.user.profilePic_url,
    userId: (String(req.user._id))
  };
  const challengeId = req.params.id;
  
  
  try{
    const challenge = await challengesAPI.fetchOneChallenge(challengeId);
    const challengeParticipators = challenge.participators.map((participator)=>{
      return String(participator._id);
    })
    let challengeEnded = null;
    const remainingTime = new Date(challenge.duration) - new Date();

    if (!(remainingTime > 0)) {
      challengeEnded = true;
    } else {
        challengeEnded = false;
    }
    res.render("oneChallenge", {pageInfo: pageInfo, challenge: challenge, challengeEnded: challengeEnded, challengeParticipators: challengeParticipators, messages: req.flash()});
  }catch(err){
    res.redirect("/challenges")
  }
}

const participateInChallengeRender = async(req, res)=>{
  const challengeId = req.params.id;
  const userId = req.user._id;
  try{
    await challengesAPI.participateInChallenge(challengeId, userId);
    req.flash('success', 'You have successfully participated in this challenge');
    res.redirect(`/challenges/${challengeId}`);
  }catch(err){
    req.flash('error', err.message);
    res.redirect(`/challenges/${challengeId}`);
  }
};

const deleteChallengeController = async(req, res)=>{
  const challengeId = req.params.challengeId;
  const user = req.user._id;
  try {
    await challengesAPI.deleteChallenge(challengeId, user);
    res.redirect("/profile/activity");
  } catch (err) {
    req.flash("error", "failed to delete challenge");
    res.redirect("/profile");
  }
};



module.exports = {
  challengesRender,
  createChallengeRender,
  createChallengeController,
  viewOneChallengeRender,
  participateInChallengeRender,
  deleteChallengeController
};
