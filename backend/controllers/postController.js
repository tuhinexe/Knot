const findUser = require("../api/findUser");
const findPosts = require("../api/getPosts");
const likeCounter = require("../api/likeCounter");
const imageUploader = require("../api/imageUploader");
const addPost = require("../api/addPost");
const User = require("../models/Users");

const createPostRender = async (req, res) => {
  res.render("addpost");
};

const createPostController = async (req, res) => {
  const user = req.user;
  const content = req.body.content;
  const imageUrlMaker = req.body.basedImage;
  const imageUrl = imageUrlMaker? await imageUploader(req.body.basedImage): '';
  try {
    await addPost(user, content, imageUrl);
    res.redirect("/profile");
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


module.exports = {
  createPostRender,
  createPostController,
  viewPostRender,
  viewPostController,
  likeCountController,
  dislikeCountController
};
