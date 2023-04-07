const Users = require("../models/Users");

const followersRender = async (req, res) => {
  const user = await Users.findById(req.user._id)
    .populate("followers")
    .populate("following");
  res.render("followers", {
    pageTitle: "Knot - Followers",
    profilePicLoggedIn: req.user.profilePic_url,
    pageName: "followers",
    user: user,
    isFollowers: true,
    isFollowing: false,
    isSearching: false,
    followers: user.followers,
    currentUser: req.user,
    messages: req.flash(),
  });
};

const followingRender = async (req, res) => {
  const user = await Users.findById(req.user._id)
    .populate("followers")
    .populate("following");
  res.render("followers", {
    pageTitle: "Knot - Followers",
    profilePicLoggedIn: req.user.profilePic_url,
    pageName: "followers",
    user: user,
    isFollowing: true,
    isFollowers: false,
    isSearching: false,
    following: user.following,
    currentUser: req.user,
    messages: req.flash(),
  });
};

const viewProfileFollowersRender = async (req, res) => {
  const user = await Users.findById(req.params.profileId)
    .populate("followers")
    .populate("following");
  res.render("followers", {
    pageTitle: "Knot - Followers",
    profilePicLoggedIn: user.profilePic_url,
    pageName: "viewfollowers",
    user: user,
    isFollowers: true,
    isFollowing: false,
    followers: user.followers,
    currentUser: req.user,
    messages: req.flash(),
  });
};

const viewProfileFollowingRender = async (req, res) => {
  const user = await Users.findById(req.params.profileId)
    .populate("followers")
    .populate("following");
  res.render("followers", {
    pageTitle: "Knot - Followers",
    profilePicLoggedIn: user.profilePic_url,
    pageName: "viewfollowers",
    user: user,
    isFollowing: true,
    isFollowers: false,
    following: user.following,
    currentUser: req.user,
    messages: req.flash(),
  });
};

module.exports = {
  followersRender,
  followingRender,
  viewProfileFollowersRender,
  viewProfileFollowingRender,
};
