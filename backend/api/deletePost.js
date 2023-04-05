const Posts = require('../models/Posts');
const deleteImage = require('./deleteImage');

const deletePost = async (postId,user) => {
    const post = await Posts.findById(postId);
    if(post.creator.toString() === user._id.toString()){
        await Posts.findByIdAndDelete(postId);
        const imageId = await Posts.findById(postId).select('imageId');
        if(imageId !== null){
            await deleteImage(imageId);
        }
        user.posts.pull(postId);
        user.points -= 3;
        await user.save();
    } else {
        user.posts.pull(postId)
        await user.save();
    }
}

module.exports = deletePost;
