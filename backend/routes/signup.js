const router = require("express").Router();
const passport = require("passport");

const signUp = require("../controllers/userController");

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/google/login", passport.authenticate('google', { failureRedirect: '/login' }), (req, res)=>{
    console.log("GoogleStrategy");
});

module.exports = router;
