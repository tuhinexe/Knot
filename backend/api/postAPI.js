const Post = require("../models/Posts");
const userModel = require("../models/Users");
const deleteImage = require("./deleteImage");
const userAPI = require("./userAPI");

const fetchPosts = async () => {
  const posts = await Post.find({})
    .sort({ createdAt: -1 })
    .populate("creator")
    .exec();
  return posts;
};

async function findPosts(user) {
  const userFound = await userModel.findById(user._id).populate("posts").exec();
  if (userFound) {
    return userFound.posts.reverse();
  } else {
    console.log("posts not found");
  }
}

const deletePost = async (postId, user) => {
  const post = await Post.findById(postId);
  if (post.creator.toString() === user._id.toString()) {
    await Post.findByIdAndDelete(postId);
    const imageId = await Post.findById(postId).select("imageId");
    if (imageId !== null) {
      await deleteImage(imageId);
    }
    const foundUser = await userModel.findById(user._id.toString());
    foundUser.points -= 3;
    foundUser.posts.pull(postId);
    await foundUser.save();

    return;
  } else {
    const foundUser = await userModel.findById(user._id.toString());
    foundUser.posts.pull(postId);
    await foundUser.save();
    return;
  }
};

const addPost = async (user, content, imageUrl, imageId) => {
  if (!content && !imageUrl) {
    throw new Error("Please upload an image or write a post");
  }
  const newPost = new Post({
    content: content,
    creator: user._id,
    imagePath: imageUrl,
    imageId: imageId,
  });
  newPost.save((err, post) => {
    if (err) {
      throw new Error("something went wrong during saving");
    } else {
      try {
        userAPI.findUser(user).then((user) => {
          user.posts.push(post._id);
          user.points += 3;
          user.save((err, user) => {
            if (err) {
              throw new Error("something went wrong during saving");
            } else {
              return;
            }
          });
        });
      } catch (err) {
        throw new Error(err);
      }
    }
  });
};

const sharePost = async (postId, currentShare, user) => {
  const post = await Post.findById(postId);
  if (user.posts.includes(postId)) {
    return;
  }
  const postCreator = await userModel.findById(post.creator);
  postCreator.points += 2;
  user.posts.push(postId);
  post.stats.shares = currentShare + 1;
  await Promise.all([postCreator.save(), post.save(), user.save()]);
};

module.exports = { fetchPosts, findPosts, deletePost, addPost, sharePost };
