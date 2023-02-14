const findUser = require('../api/findUser');

// ----------------

const viewProfileRender = async (req, res)=>{
    const userData = await findUser(req.user);
    res.render("profile", {user: userData})
}















// ----------------
const editProfileRender = async (req, res) => {
    const user = await findUser(req.user._id);
    res.render("editProfile", { existingdata:user });
}
const editProfileController = async (req, res) => {
    const postedData={
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        date_of_birth: req.body.dob,
    }
    await findUser(postedData)
}

module.exports = {viewProfileRender,
editProfileRender,editProfileController};