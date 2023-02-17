const findUser = require("../api/findUser");
const pollsModel = require("../models/Polls");

const pollsRender = async (req, res) => {
    res.render("polls");
}
const pollsController = async (req, res) => {
    const id = req.user._id;
    const title = req.body.title;
    const [option1, option2, option3, option4] = req.body.option;
    const newPoll =new pollsModel( {
        creatorId:id,
        content: title,
        options: [
            {
                
                optionsName: option1,
                votesCount: 0

            },
            {
                
                optionsName: option2,
                votesCount: 0
            },
            {
                
                optionsName: option3,
                votesCount: 0
            },  
            {
                
                optionsName: option4,
                votesCount: 0
            }
        
        ]

    });
    console.log(newPoll);
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

module.exports = {
    pollsRender,
    pollsController
};