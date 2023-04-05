const findUser = require("../api/findUser");
const updateUser = require("../api/updateUser");
const getPosts = require("../api/getPosts");
const getActivities = require("../api/getActivities");
const { followAndUnfollow } = require("../api/followAPI");

const viewProfileRender = async (req, res) => {
  const userData = await findUser(req.user);
  let profilePic = req.user.profilePic_url;
  let posts = await getPosts(req.user);
  for (let post of posts) {
    await post.populate("creator");
  }

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
    messages: req.flash(),
  });
};

const viewActivityRender = async (req, res) => {
  // console.log(req.user)
  try {
    const userData = await findUser(req.user);
    let profilePic = req.user.profilePic_url;
    const [activities, totalVotes] = await getActivities(req.user);
    const creatorDetails = {
      creator: req.user.firstname + " " + req.user.lastname,
      profilePic_url: req.user.profilePic_url,
    };
    // const challenges = await getChallenges(req.user );
    res.render("profileActivity", {
      activeUser: userData,
      user: userData,
      profilePic: profilePic,
      profilePicLoggedIn: profilePic,
      pageTitle: "Knot - Profile",
      creatorDetails: creatorDetails,
      pageName: "profile-activities",
      activities: activities,
      totalVotes: totalVotes,
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/profile");
  }
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
    messages: req.flash(),
  });
};
const editProfileController = async (req, res) => {
  const id = req.user._id;

  const postedData = {
    points: req.user.points,
  };
  if (req.body.dob !== "") {
    postedData.date_of_birth = req.body.dob;
  }
  if (req.body.firstname !== "") {
    postedData.firstname = req.body.firstname.replace(/\s/g, "");
  }
  if (req.body.lastname !== "") {
    postedData.lastname = req.body.lastname.replace(/\s/g, "");
  }
  if (req.body.bio !== "") {
    postedData.bio = req.body.bio;
  }
  if (req.body.username !== "") {
    postedData.username = req.body.username.replace(/\s/g, "");
  }
  if (req.body.profilePic !== "") {
    postedData.profilePic_url = req.body.profilePic;
  }

  if ((!(req.user.username == postedData.username)) && postedData.username != undefined) {
    if(postedData.points < 20){
      req.flash("error", "You don't have enough points to change your username");
      res.json({ error: "You don't have enough points to change your username" });
      return;
    }else{
      postedData.points -= 20
    }
  }
  if(postedData.profilePic_url){
    if(postedData.points < 50){
      req.flash("error", "You don't have enough points to change your profile picture");
      res.json({ error: "You don't have enough points to change your profile picture" });
      return;
    } else{
      postedData.points -= 50
    }
  }
  try {
    await updateUser(id, postedData);
    req.flash("success", "Profile updated successfully");
    res.json({ success: "Profile updated successfully" });
  } catch (err) {
    req.flash("error", err.message);
    res.json({ error: err.message });
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
  try {
    const userData = await findUser(user);
    const activeUser = req.user;
    let profilePic = userData.profilePic_url;
    let posts = await getPosts(user);
    for (let post of posts) {
      await post.populate("creator");
    }
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
      messages: req.flash(),
    });
  } catch (err) {
    res.redirect("/");
  }
};

const singleProfileActivityRender = async (req, res) => {
  let user = {
    _id: req.params.profileId,
  };
  if (user._id === String(req.user._id)) {
    res.redirect("/profile/activity");
    return;
  }
  try {
    const userDataPromise = findUser(user);
    const activitiesPromise = getActivities(user);
    const [userData, [activities, totalVotes]] = await Promise.all([
      userDataPromise,
      activitiesPromise,
    ]);
    const activeUser = req.user;
    let profilePic = userData.profilePic_url;
    const creatorDetails = {
      creator: userData.firstname + " " + userData.lastname,
      profilePic_url: userData.profilePic_url,
    };
    // const challenges = await getChallenges(req.user );
    res.render("profileActivity", {
      activeUser,
      user: userData,
      profilePic: profilePic,
      profilePicLoggedIn: req.user.profilePic_url,
      pageTitle: "Knot - Profile",
      creatorDetails: creatorDetails,
      pageName: "viewProfile-activities",
      activities: activities,
      totalVotes: totalVotes,
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/profile");
  }
};

const followController = async (req, res) => {
  const followerId = req.user._id;
  const followingId = req.params.followingId;
  try {
    await followAndUnfollow(followingId, followerId);
    res.redirect(`/following`);
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
  singleProfileActivityRender,
  followController,
};
