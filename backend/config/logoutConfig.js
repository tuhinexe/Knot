const passportSetup = require("./passportConfig");
const passport = require("passport");

const initializeLogout = async (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log(err);
      res.redirect("/unknownerror");
    } else {
      res.redirect("/login");
    }
  });
};

module.exports = initializeLogout;
