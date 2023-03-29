const postModel = require("../models/Posts");
const findUser = require("./findUser");

const addPost = async (user, content, imageUrl,imageId,res) => {
  const newPost = new postModel({
    content: content,
    creator: user._id,
    imagePath: imageUrl,
    imageId: imageId
  });
  newPost.save((err, post) => {
    if (err) {
      console.log(err);
    } else {
      try {
        findUser(user).then((user) => {
          user.posts.push(post._id);
          user.save((err, user) => {
            if (err) {
              console.log(err);
            } else {
              res.redirect("/")
            }
          });
        });
      } catch (err) {
        res.send(err.message);
      }
    }
  });
};

module.exports = addPost;