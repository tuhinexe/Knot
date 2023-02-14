const findUser = require('../api/findUser');
const updateUser = require('../api/updateUser');

// ----------------

const viewProfileRender = async (req, res) => {
    const userData = await findUser(req.user);
    res.render("profile", { user: userData })
}















// ----------------
const editProfileRender = async (req, res) => {
    const user = await findUser(req.user._id);
    res.render("editProfile", { existingdata: user });
    
}
const editProfileController = async (req, res) => {
    const id = req.body.id
    const postedData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        date_of_birth: req.body.dob,
    }

    try { await updateUser(id, postedData).then(res.redirect("/profile")) } catch (err) { console.log(err) }

}

module.exports = {
    viewProfileRender,
    editProfileRender,
    editProfileController
};