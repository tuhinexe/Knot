const mongoose = require("mongoose");

let UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true,
    },
    lastname: {
      type: String,
      required: true,
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true,
    },
    username: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true,
    },
    bio: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    profilePic_url: {
      type: String,
    },
    points: {
      type: Number,
      default: 0,
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    challenges: [{ type: mongoose.Schema.Types.ObjectId, ref: "Challenge" }],
    polls: [{ type: mongoose.Schema.Types.ObjectId, ref: "Poll" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
