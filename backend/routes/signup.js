const router = require("express").Router();
const passport = require("passport");
const checkNotAuthorized = require("../middlewares/notAuth.js");

const signUp = require("../controllers/userController");
router
  .route("/")
  .get(checkNotAuthorized, signUp.signUpRender)
  .post(signUp.signUpController);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/login",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/profile");
  }
);

module.exports = router;
