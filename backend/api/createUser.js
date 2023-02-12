const userModel = require("../models/Users");
const postModel = require("../models/Posts");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

async function create_newUser(user) {
  const userData = {
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    email: user.email

  };
  userModel.register(userData, user.password, (err, user) => {
    if (err) {
      console.log(err);
      res.redirect('/signup');
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/profile");
      });
    }
  });
};

module.exports = create_newUser;









