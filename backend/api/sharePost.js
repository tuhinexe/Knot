const Post = require("../models/Posts");
const User = require("../models/Users");

const sharePost = async (postId,currentShare,user) => {
    const post = await Post.findById(postId);
    if(user.posts.includes(postId)){
        return;
    }
    const postCreator = await User.findById(post.creator);
    postCreator.points += 2;
    user.posts.push(postId);
    post.stats.shares = currentShare+1;
    await Promise.all([postCreator.save(),post.save(),user.save()])
}

module.exports = sharePost;