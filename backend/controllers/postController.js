const findUser = require("../api/findUser");
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
      User.findById(userId, (err, user) => {
        if (err) {
          console.log(err);
        } else {
          user.posts.push(post._id);
          user.save((err, user) => {
            if (err) {
              console.log(err);
            } else {
                res.redirect("/profile")
            }
          });
        }
      });
    }
  });
};

module.exports = { createPostRender, createPostController };
