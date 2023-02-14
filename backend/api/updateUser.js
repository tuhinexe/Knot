const userModel = require("../models/Users");

const updateUser = async (id, postedData) => {
    userModel.findOneAndUpdate({ _id: id }, postedData, (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            return;
        }
    })
}

module.exports = updateUser;
