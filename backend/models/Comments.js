const mongoose = require("mongoose");
const schema = mongoose.Schema;

const commentSchema = mongoose.Schema({
    content: { type: String, required: true },
    commentor: { type: schema.Types.ObjectId, ref: "User", required: true },
    timestamp: { type: Date, default: Date.now },
    stats: {
        upvotes: { type: Number, default: 0 },
        downvotes: { type: Number, default: 0 },
    },
    replies: [
        {
            content: { type: String, required: true },
            author: { type: schema.Types.ObjectId, ref: "User", required: true },
        }
    ]


});

module.exports = mongoose.model("Comment", commentSchema);