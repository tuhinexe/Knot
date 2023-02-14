const userModel = require("../models/Users");
const postModel = require("../models/Posts");

async function increaseLike(post) {
  const postFound = await postModel.findOneAndUpdate(
    { _id: post._id },
    { stats: { upvotes: post.stats.upvotes + 1 } }
  );
  if (postFound) {
    return postFound.posts;
  } else {
    console.log("posts not found");
  }
}

module.exports = increaseLike;
