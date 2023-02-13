const findUser = require('../api/findUser');

const createPostRender = async (req, res)=>{
    const userData = await findUser(req.user);
    res.render("addpost")
}


module.exports = {createPostRender};