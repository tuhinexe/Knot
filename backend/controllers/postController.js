const findUser = require("../api/findUser");
const findPosts = require("../api/getPosts");
const likeCounter = require("../api/likeCounter");
const postModel = require("../models/Posts");
const User = require("../models/Users");

const createPostRender = async (req, res) => {
  res.render("addpost");
};

const createPostController = async (req, res) => {
  const userId = req.user._id;
  const content = req.body.content;
  const newPost = new postModel({
    content: content,
    creator: userId,
  });
  newPost.save((err, post) => {
    if (err) {
      console.log(err);
    } else {
      try {
        findUser(req.user).then((user) => {
          user.posts.push(post._id);
          user.save((err, user) => {
            if (err) {
              console.log(err);
            } else {
              res.redirect("/profile");
            }
          });
        });
      } catch (err) {
        res.send(err.message);
      }
    }
  });
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
    await likeCounter.increaseLike(postId, currentLike, currentDisLike);
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
    await likeCounter.decreaseLike(postId, currentLike, currentDisLike);
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
