const Post = require("../models/Posts");
const Comment = require("../models/Comments");
const User = require("../models/Users");

const deleteComment = async (commentId, postId) => {
  const post = await Post.findById(postId);
  post.stats.comments.pull(commentId);
  const postCreator = await User.findById(post.creator);
  postCreator.points -= 2;
  Promise.all([
    postCreator.save(),
    post.save(),
    Comment.findByIdAndDelete(commentId),
  ])
    .then(() => {
      return;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

module.exports = deleteComment;
