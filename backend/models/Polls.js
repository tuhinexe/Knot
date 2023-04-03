const mongoose = require("mongoose")

const pollsSchema = mongoose.Schema({
    creatorId: { type: mongoose.Schema.Types.ObjectId,ref: "User", required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now } ,
    options: [
        {
            optionsName: String,
            voted_by: [{type:mongoose.Schema.Types.ObjectId,ref: "User" }]
        }
    ]
});

module.exports = mongoose.model("Poll", pollsSchema);