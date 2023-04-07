const userAPI = require("../api/userAPI");
const pollsModel = require("../models/Polls");
const pollsAPI = require("../api/pollsAPI");

const pollsRender = async (req, res) => {
    const pageInfo = {
        title: 'Knot - Polls',
        pagename: 'polls',
        profilePic: req.user.profilePic_url,
        userId: req.user._id,
    }

    try {
        const [polls, totalVotes] = await pollsAPI.fetchPolls();
        res.render('polls', { polls, pageInfo: pageInfo, totalVotes });
    } catch (err) {
        console.log(err);
        res.render('polls', { polls: [] });
    }
}


const createPollsController = async (req, res) => {
    const id = req.user._id;
    const title = req.body.title;
    const [option1, option2, option3, option4] = req.body.option;
    const newPoll = new pollsModel({
        creatorId: id,
        content: title,
        options: [
            {

                optionsName: option1,
                voted_by: []

            },
            {

                optionsName: option2,
                voted_by: []
            },
            {

                optionsName: option3,
                voted_by: []
            },
            {

                optionsName: option4,
                voted_by: []
            }

        ]

    });
    newPoll.save((err, poll) => {
        if (err) {
            req.flash("error", "can't create poll, try again later");
            res.redirect("/");
        } else {
            try {
                userAPI.findUser(req.user).then((user) => {
                    user.polls.push(poll._id);
                    user.points += 5;
                    user.save((err, user) => {
                        if (err) {
                            req.flash("error", "can't create poll, try again later");
                            res.redirect("/profile");
                        } else {
                            res.redirect("/profile/activity");
                        }
                    });
                });
            } catch (err) {
                res.send(err.message);
            }
        }
    });

}


const viewPollsRender = async (req, res) => {
    const postData = await pollsAPI.getPolls(req.user);
    res.render("viewPolls", { polls: postData[0] });
};

const createPollsRender = async (req, res) => {
    const pageInfo = {
        user: req.user,
        title: "Knot - New Polls",
        pagename: "add polls",
        profilePic: req.user.profilePic_url,
    };
    const user = req.user;
    res.render("addPolls", { user: user, pageInfo: pageInfo });
}

const voteController = async (req, res) => {
    const clickedOptionId = req.body.clickedOptionId;
    const pollId = req.body.pollId;
    const userId = req.user._id;
    try {
        await pollsAPI.voteCount(pollId, clickedOptionId, userId);
        res.redirect("/polls");
    } catch (err) {
        console.log(err);
    }

}

const deletePollController = async (req, res) => {
    const pollId = req.params.pollId;
    const user = req.user;
    try {
        await pollsAPI.deletePoll(pollId, user);
        res.redirect("/profile/activity");
    } catch (err) {
        req.flash("error", "can't delete poll, try again later");
        res.redirect("/profile");
    }
};

module.exports = {
    pollsRender,
    createPollsController,
    viewPollsRender,
    createPollsRender,
    voteController,
    deletePollController
};