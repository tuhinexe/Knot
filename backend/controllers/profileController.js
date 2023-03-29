const findUser = require('../api/findUser');
const updateUser = require('../api/updateUser');
const getPosts = require('../api/getPosts');
const { getPolls, getChallenges } = require('../api/getActivities');
const { followAndUnfollow } = require('../api/followAPI')

const viewProfileRender = async (req, res) => {
    const userData = await findUser(req.user);
    let profilePic = req.user.profilePic_url;
    const posts = await getPosts(req.user);
    const creatorDetails = {
        creator: req.user.firstname + ' ' + req.user.lastname,
        profilePic_url: req.user.profilePic_url
    }

    res.render("profile", { activeUser: userData ,user: userData, profilePic: profilePic,profilePicLoggedIn: profilePic, pageTitle: 'Knot - Profile', posts: posts, creatorDetails: creatorDetails, pageName: 'profile'})
}

const viewActivityRender = async (req, res) => {
    // console.log(req.user)
    const userData = await findUser(req.user);
    let profilePic = req.user.profilePic_url;
    const polls = await getPolls(req.user);
    const creatorDetails = {
        creator: req.user.firstname + ' ' + req.user.lastname,
        profilePic_url: req.user.profilePic_url
    }
    // const challenges = await getChallenges(req.user );
    res.render("profilePolls", { activeUser: userData , user: userData, profilePic: profilePic,profilePicLoggedIn: profilePic, pageTitle: 'Knot - Profile', creatorDetails: creatorDetails, pageName: 'profile-activities', polls: polls})
};

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
const singleProfileRender = async (req, res) => {
    let user ={
        _id: req.params.profileId
    }
    if(user._id === String(req.user._id)){
        res.redirect('/profile')
        return
    }
    const userData = await findUser(user);
    const activeUser = req.user
    let profilePic = userData.profilePic_url;
    const posts = await getPosts(user);
    const creatorDetails = {
        creator: userData.firstname + ' ' + userData.lastname,
        profilePic_url: userData.profilePic_url
    }

    res.render("profile", {activeUser, user: userData, profilePic: profilePic,profilePicLoggedIn: req.user.profilePic_url, pageTitle: 'Knot - Profile', posts: posts, creatorDetails: creatorDetails, pageName: 'viewProfile'})
}

const followController = async (req,res) => {
    const followerId = req.user._id
    const followingId = req.params.followingId
    try{
        await followAndUnfollow(followingId,followerId)
        res.redirect(`/follow/following`)
    } catch(err){
        console.log(err)
    }
}

module.exports = {
    viewProfileRender,
    viewActivityRender,
    editProfileRender,
    editProfileController,
    singleProfileRender,
    followController
};