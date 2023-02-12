const userModel = require("../models/Users");
const postModel = require("../models/Posts");

async function create_newUser({user}) {
  const newUser = new userModel({
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    email: user.email,

  });
  try {
    await newUser.save();
    console.log("user saved");
  } catch (err) {
    console.log(err);
  }
  const posts = await postModel.find();
  try {
    console.log(posts);
  } catch (err) {
    console.log(err);
  }
}

module.exports = create_newUser;









