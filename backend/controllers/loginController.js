



const loginRender = (req, res) => {
    res.render("login");
}

const loginController = async (req, res) => {
    console.log("logged in");
}



module.exports = {
    loginController,
    loginRender
}
