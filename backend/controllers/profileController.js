const findUser = require('../api/findUser');

// ----------------

const viewProfileRender = async (req, res)=>{
    const userData = await findUser(req.user);
    res.render("profile", {user: userData})
}














// ----------------
const editProfileRender = async (req, res) => {
    const user = await findUser(req.user._id);
    res.render("editProfile", { user });
}

module.exports = {viewProfileRender,
editProfileRender};