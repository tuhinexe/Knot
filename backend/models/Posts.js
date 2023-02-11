const mongoose = require("mongoose");
const schema = mongoose.Schema;

const postSchema = mongoose.Schema({
  content: { type: String, required: true },
  imagePath: { type: String },
  creator: {
    type: schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
  stats: 
    {
      upvotes: { type: Number, default: 0 },
      downvotes: { type: Number, default: 0 },
      shares: { type: Number, default: 0 },
      comments: { type: Number, default: 0 },
    },

},{timestamps: true});

module.exports = mongoose.model("Post", postSchema);
