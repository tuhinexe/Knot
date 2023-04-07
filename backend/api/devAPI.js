const userModel = require("../models/Users");
const postModel = require("../models/Posts");

async function increaseLike(postId, currentLike, currentDisLike, userId) {
  const postFound = await postModel.findById(postId).then((post)=>{
    if(post){
      let indexInDownvotes = post.stats.downvoted_by.indexOf(userId);
      if(indexInDownvotes > -1){
        post.stats.downvoted_by.splice(indexInDownvotes, 1);
      }
      post.stats.upvoted_by.push(userId);
      post.stats.upvotes = currentLike + 1;
      post.stats.downvotes = currentDisLike;
      post.save();
      userModel.findById(post.creator).then((user)=>{
        user.points += 1;
        user.save();
      })
      return post;
    }

  });
  if (postFound) {
    return postFound.posts;
  } else {
    console.log("posts not found");
  }
}
async function decreaseLike(postId, currentLike, currentDisLike, userId) {
  const postFound = await postModel.findById(postId).then((post)=>{
    if(post){
      let indexInUpvotes = post.stats.upvoted_by.indexOf(userId);
      if(indexInUpvotes > -1){
        post.stats.upvoted_by.splice(indexInUpvotes, 1);
      }
      post.stats.downvoted_by.push(userId);
      post.stats.upvotes = currentLike;
      post.stats.downvotes = currentDisLike + 1;
      post.save();
      userModel.findById(post.creator).then((user)=>{
        user.points -= 1;
        user.save();
      })
      return post;
    }

  });
  if (postFound) {
    return postFound.posts;
  } else {
    console.log("posts not found");
  }
}

module.exports = { increaseLike, decreaseLike };
