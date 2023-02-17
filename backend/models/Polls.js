const mongoose = require("mongoose")

const pollsSchema = mongoose.Schema({
    creatorId: { type: mongoose.Schema.Types.ObjectId,ref: "User", required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now } ,
    options: [
        {
            
            optionsName: String,
            votesCount: Number
        }
    ]
});

module.exports = mongoose.model("Poll", pollsSchema);