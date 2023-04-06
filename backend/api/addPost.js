const postModel = require("../models/Posts");
const findUser = require("./findUser");

const addPost = async (user, content, imageUrl,imageId,res) => {
if(!user && content === "" && imageUrl === "") return res.redirect('back');
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
          user.points += 3;
          user.save((err, user) => {
            if (err) {
              console.log(err);
            } else {
              res.redirect("/")
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
