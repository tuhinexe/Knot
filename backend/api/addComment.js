const Comment = require('../models/Comments');
const Posts = require("../models/Posts")

const addComment = async (commentDetails,postId) => {
    try {
        const newComment = new Comment(commentDetails);
        await newComment.save();

        const post = await Posts.findById(postId)

        await post.stats.comments.push(newComment._id)
        await post.save()
    } catch (err) {
        console.log(err);
    }
}

module.exports = addComment