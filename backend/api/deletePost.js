const Posts = require('../models/Posts');
const deleteImage = require('./deleteImage');

const deletePost = async (postId,user) => {
    await Posts.findByIdAndDelete(postId);
    const imageId = await Posts.findById(postId).select('imageId');
    if(imageId !== null){
        await deleteImage(imageId);
    }
    user.posts.pull(postId)
    await user.save();
}

module.exports = deletePost;
