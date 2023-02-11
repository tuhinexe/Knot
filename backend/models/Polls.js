const mongoose = require("mongoose")

const pollsSchema = mongoose.Schema({
    creatorId: { type: mongoose.Schema.Types.ObjectId,ref: "User", required: true },
    pollId: { type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now } ,
    options: [
        {
            optionId: String,
            optionsName: String,
            votesCount: Number
        }
    ]
});

module.exports = mongoose.model("Poll", pollsSchema);