const router = require("express").Router();
const passport = require("passport");

router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    res.send("You are logged in");
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
