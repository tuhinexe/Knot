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
  console.log("like count increased");
  // await likeCounter(post);
  res.send("post liked");
};

module.exports = {
  createPostRender,
  createPostController,
  viewPostRender,
  viewPostController,
  likeCountController,
};
