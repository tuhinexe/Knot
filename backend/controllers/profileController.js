const findUser = require("../api/findUser");
const updateUser = require("../api/updateUser");
const getPosts = require("../api/getPosts");
const { getPolls, getChallenges } = require("../api/getActivities");
const { followAndUnfollow } = require("../api/followAPI");

const viewProfileRender = async (req, res) => {
  const userData = await findUser(req.user);
  let profilePic = req.user.profilePic_url;
  const posts = await getPosts(req.user);
  const creatorDetails = {
    creator: req.user.firstname + " " + req.user.lastname,
    profilePic_url: req.user.profilePic_url,
  };

  res.render("profile", {
    activeUser: userData,
    user: userData,
    profilePic: profilePic,
    profilePicLoggedIn: profilePic,
    pageTitle: "Knot - Profile",
    posts: posts,
    creatorDetails: creatorDetails,
    pageName: "profile",
    messages: req.flash()
  });
};

const viewActivityRender = async (req, res) => {
  // console.log(req.user)
  const userData = await findUser(req.user);
  let profilePic = req.user.profilePic_url;
  const polls = await getPolls(req.user);
  const creatorDetails = {
    creator: req.user.firstname + " " + req.user.lastname,
    profilePic_url: req.user.profilePic_url,
  };
  // const challenges = await getChallenges(req.user );
  res.render("profilePolls", {
    activeUser: userData,
    user: userData,
    profilePic: profilePic,
    profilePicLoggedIn: profilePic,
    pageTitle: "Knot - Profile",
    creatorDetails: creatorDetails,
    pageName: "profile-activities",
    polls: polls,
  });
};

const editProfileRender = async (req, res) => {
  const userData = await findUser(req.user);
  let profilePic = req.user.profilePic_url;
  res.render("editProfile", {
    activeUser: userData,
    user: userData,
    profilePic: profilePic,
    profilePicLoggedIn: profilePic,
    pageTitle: "Knot - Profile",
    pageName: "profile-edit",
    existingdata: userData,
    messages: req.flash()
  });
};
const editProfileController = async (req, res) => {
  const id = req.user._id;

  const postedData = {};
  if (req.body.dob !== "") {
    postedData.date_of_birth = req.body.dob;
  };
  if (req.body.firstname !== "") {
    postedData.firstname = req.body.firstname;
  };
  if (req.body.lastname !== "") {
    postedData.lastname = req.body.lastname;
  };
  if (req.body.bio !== "") {
    postedData.bio = req.body.bio;
  };
  if (req.body.username !== "") {
    postedData.username = req.body.username;
  };

  try {
    await updateUser(id, postedData);
    req.flash("success", "Profile updated successfully");
    res.redirect("/profile");
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/profile/update");
  }
};
const singleProfileRender = async (req, res) => {
  let user = {
    _id: req.params.profileId,
  };
  if (user._id === String(req.user._id)) {
    res.redirect("/profile");
    return;
  }
  const userData = await findUser(user);
  const activeUser = req.user;
  let profilePic = userData.profilePic_url;
  const posts = await getPosts(user);
  const creatorDetails = {
    creator: userData.firstname + " " + userData.lastname,
    profilePic_url: userData.profilePic_url,
  };

  res.render("profile", {
    activeUser,
    user: userData,
    profilePic: profilePic,
    profilePicLoggedIn: req.user.profilePic_url,
    pageTitle: "Knot - Profile",
    posts: posts,
    creatorDetails: creatorDetails,
    pageName: "viewProfile",
  });
};

const followController = async (req, res) => {
  const followerId = req.user._id;
  const followingId = req.params.followingId;
  try {
    await followAndUnfollow(followingId, followerId);
    res.redirect(`/follow/following`);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  viewProfileRender,
  viewActivityRender,
  editProfileRender,
  editProfileController,
  singleProfileRender,
  followController,
};
