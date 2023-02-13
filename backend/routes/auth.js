const router = require("express").Router();
const passport = require("passport");
const checkNotAuthorized = require("../middlewares/notAuth.js");

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