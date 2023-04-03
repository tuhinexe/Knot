const Poll = require("../models/Polls");



const fetchPolls = async () => {
    const polls = await Poll.find({}).sort({timestamp: -1}).populate("creatorId").exec();
    const totalVotes = polls.map(poll => {
        return poll.options.reduce((acc, option) => {
            return acc + option.voted_by.length;
        }, 0);
    });
    return [polls, totalVotes];
    }

module.exports = fetchPolls;

