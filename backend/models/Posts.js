const mongoose = require("mongoose");
const schema = mongoose.Schema;

const postSchema = mongoose.Schema(
  {
    content: { type: String },
    imagePath: { type: String },
    imageId: { type: String },
    creator: {
      type: schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: false,
    },
    timestamp: { type: Date, default: Date.now },
    stats: {
      upvoted_by: { type: Array, default: [] },
      downvoted_by: { type: Array, default: [] },
      shares: { type: Number, default: 0 },
      commented_by: { type: Array, default: [] },
      comments: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
