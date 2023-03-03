const Posts = require('../models/Posts');
const findUser = require('./findUser');

const deletePost = async (postId,user) => {
    await Posts.findByIdAndDelete(postId);
    await findUser(user).then((user) => {
        user.posts.pull(postId);
        user.save();
    });
}

module.exports = deletePost;
