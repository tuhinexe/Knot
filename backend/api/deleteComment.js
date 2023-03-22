const Post = require("../models/Posts");
const Comment = require("../models/Comments");

const deleteComment = async (commentId, postId) => {
    const post = await Post.findById(postId);
    post.stats.comments.pull(commentId);
    await post.save();
    await Comment.findByIdAndDelete(commentId);
}

module.exports = deleteComment;