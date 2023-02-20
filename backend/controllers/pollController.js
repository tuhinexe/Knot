const findUser = require("../api/findUser");
const pollsModel = require("../models/Polls");
const fetchPolls = require("../api/fetchPolls");


const pollsRender = async (req, res) => {
    const pageInfo = {
        title: 'Knot - Polls',
        pagename: 'polls',
        profilePic: req.user.profilePic_url,
        userId: req.user._id,
    }

    try {
        const polls = await fetchPolls();
        res.render('polls', { polls, pageInfo: pageInfo });
    } catch (err) {
        console.log(err);
        res.render('polls', { polls: [] });
    }
}


const pollsController = async (req, res) => {
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
            console.log(err);
        } else {
            try {
                findUser(req.user).then((user) => {
                    user.polls.push(poll._id);
                    user.save((err, user) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.redirect("/profile");
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
    const postData = await getPolls(req.user);
    res.render("viewpolls", { polls: postData[0] });
};

const createPollsRender = async (req, res) => {
    const user = req.user;
    res.render("createPolls", { user:user });
}


module.exports = {
    pollsRender,
    pollsController,
    viewPollsRender,
    createPollsRender
};