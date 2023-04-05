const Comment = require("../models/Comments");
const Posts = require("../models/Posts");
const User = require("../models/Users");

const addComment = async (commentDetails, postId) => {
  try {
    const newComment = new Comment(commentDetails);
    await newComment.save();

    const post = await Posts.findById(postId);
    const postCreator = await User.findById(post.creator);
    postCreator.points += 2;
    await post.stats.comments.push(newComment._id);
    Promise.all([postCreator.save(), post.save()])
      .then(() => {
        return;
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports = addComment;
