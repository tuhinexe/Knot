const Post = require("../models/Posts");

const sharePost = async (postId,currentShare,user) => {
    const post = await Post.findById(postId);
    if(user.posts.includes(postId)){
        return;
    }
    user.posts.push(postId);
    post.stats.shares = currentShare+1;
    await post.save();
    await user.save();
}

module.exports = sharePost;