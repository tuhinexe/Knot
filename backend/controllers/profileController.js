const findUser = require('../api/findUser');
const updateUser = require('../api/updateUser');
const getPosts = require('../api/getPosts');

const viewProfileRender = async (req, res) => {
    const userData = await findUser(req.user);
    let profilePic = req.user.profilePic_url;
    const posts = await getPosts(req.user);
    const creatorDetails = {
        creator: req.user.firstname + ' ' + req.user.lastname,
        profilePic_url: req.user.profilePic_url
    }

    res.render("profile", { user: userData, profilePic: profilePic, pageTitle: 'Knot - Profile', posts: posts, creatorDetails: creatorDetails, pageName: 'profile'})
}



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