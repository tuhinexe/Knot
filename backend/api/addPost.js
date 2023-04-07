const postModel = require("../models/Posts");
const findUser = require("./findUser");

const addPost = async (user, content, imageUrl,imageId) => {
if(!content && !imageUrl) {
   throw new Error("Please upload an image or write a post");
}
  const newPost = new postModel({
    content: content,
    creator: user._id,
    imagePath: imageUrl,
    imageId: imageId
  });
  newPost.save((err, post) => {
    if (err) {
      throw new Error("something went wrong during saving");
    } else {
      try {
        findUser(user).then((user) => {
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

module.exports = addPost;
