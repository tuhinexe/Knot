const findPosts = require("../api/getPosts");
const likeCounter = require("../api/likeCounter");
const addPost = require("../api/addPost");
const sharePost = require("../api/sharePost");
const deletePost = require("../api/deletePost");
const User = require("../models/Users");
const Posts = require("../models/Posts");

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


const deletePostController = async (req, res) => {
  const postId = req.body.postId;
  const user = req.user;
  try {
    await deletePost(postId, user);
    res.redirect("/profile");
  } catch (err) {
    console.log(err);
  }
};

// Single Post and Comments Controller

const getSinglePostRender = async (req, res) => {
try{
  const postId = req.params.id;
  const post = await Posts.findById(postId).populate("creator").exec()
  const stats = await post.stats.populate("comments")
  const comments = []
  for (let comment of stats.comments){
    comments.push(await comment.populate("commentor"))
  }
  const pageInfo = {
    userId: req.user._id,
    title: 'Knot - Post',
    pagename : 'comment',
    profilePic: req.user.profilePic_url,
}
  res.render("post", {pageInfo: pageInfo, post: post, comments: comments});
} catch (err) {
  res.redirect("/");
};
};


module.exports = {
  createPostRender,
  createPostController,
  likeCountController,
  dislikeCountController,
  sharePostController,
  deletePostController,
  getSinglePostRender,
};
