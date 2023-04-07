const userModel = require("../models/Users");
const postModel = require("../models/Posts");
const passport = require("passport");

const findUser = async function (user) {
    const userFound = await userModel.findById(user._id).populate("posts").exec();
    if (userFound) {
      return userFound;
    } else {
      console.log("user not found");
    }
  }
  
  const updateUser = async (id, postedData) => {
    try {
        const result = await userModel.findOneAndUpdate({ _id: id }, postedData);
        return result;
      } catch (err) {
        if (err.name === "MongoServerError" && err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0]; // Get the field that caused the error
            const value = err.keyValue[field]; // Get the value that caused the error
            const message = `The ${field} "${value}" is already taken. Please choose a different ${field}.`;
            throw new Error(message);
          } else{
            throw new Error("something went wrong please try again later");
          }
      }
}



module.exports = {findUser, updateUser};









