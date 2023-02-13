const findUser = require('../api/findUser');

// ----------------

const viewProfileRender = async (req, res)=>{
    const userData = await findUser(req.user);
    res.render("profile", {user: userData})
}


module.exports = {viewProfileRender};












// ----------------