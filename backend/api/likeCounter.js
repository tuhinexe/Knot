const userModel = require("../models/Users");
const postModel = require("../models/Posts");

async function increaseLike(postId, currentLike, currentDisLike) {
  const postFound = await postModel.findByIdAndUpdate(postId, {
    stats: { upvotes: currentLike + 1, downvotes: currentDisLike },
  });
  if (postFound) {
    return postFound.posts;
  } else {
    console.log("posts not found");
  }
}
async function decreaseLike(postId, currentLike, currentDislike) {
  const postFound = await postModel.findByIdAndUpdate(postId, {
    stats: { upvotes: currentLike, downvotes: currentDislike + 1 },
  });
  if (postFound) {
    return postFound.posts;
  } else {
    console.log("posts not found");
  }
}

module.exports = { increaseLike, decreaseLike };
