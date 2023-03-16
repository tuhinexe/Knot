const findPosts = require("../api/getPosts");
const likeCounter = require("../api/likeCounter");
const addPost = require("../api/addPost");
const sharePost = require("../api/sharePost");
const deletePost = require("../api/deletePost");
const User = require("../models/Users");

const createPostRender = async (req, res) => {
  const pageInfo = {
    user: req.user,
    title: 'Knot - New Post',
    pagename : '',
    profilePic: req.user.profilePic_url,
}
  res.render("addpost", {pageInfo: pageInfo});
};

const createPostController = async (req, res) => {
  const user = req.user;
  const content = req.body.content;
  const imageUrl = req.body.imgUrl;
  const imageId = req.body.uploadedImgId
  try {
    await addPost(user, content, imageUrl, imageId,res);
  } catch (err) {
    console.log(err);
  }
};

const viewPostRender = async (req, res) => {
  const postData = await findPosts(req.user);
  res.render("viewpost", { posts: postData[0] });
};

const viewPostController = async (req, res) => {};

const likeCountController = async (req, res) => {
  if (!req.body.upvotes) return res.status(401).send("Unauthorized");
  try {
    const postId = req.body.postId;
    const currentLike = parseInt(req.body.upvotes);
    const currentDisLike = parseInt(req.body.downvotes);
    const userId = req.body.userId;
    await likeCounter.increaseLike(postId, currentLike, currentDisLike, userId);
  } catch (err) {
    console.log(err);
  }
};
const dislikeCountController = async (req, res) => {
  if (!req.body.downvotes) return res.status(401).send("Unauthorized");
  try {
    const postId = req.body.postId;
    const currentLike = parseInt(req.body.upvotes);
    const currentDisLike = parseInt(req.body.downvotes);
    const userId = req.body.userId;
    await likeCounter.decreaseLike(postId, currentLike, currentDisLike, userId);
  } catch (err) {
    console.log(err);
  }
};

const sharePostController = async (req, res) => {
  if (!req.body.shares) return;
  try {
    const postId = req.body.postId;
    const currentShare = parseInt(req.body.shares);
    const user = req.user;
    await sharePost(postId, currentShare, user);
    res.redirect("/profile");
  } catch (err) {
    console.log(err);
  }
};


const deletPostController = async (req, res) => {
  const postId = req.body.postId;
  const user = req.user;
  try {
    await deletePost(postId, user);
    res.redirect("/profile");
  } catch (err) {
    console.log(err);
  }
};


module.exports = {
  createPostRender,
  createPostController,
  viewPostRender,
  viewPostController,
  likeCountController,
  dislikeCountController,
  sharePostController,
  deletPostController
};
