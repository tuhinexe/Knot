const router = require("express").Router();
const passport = require("passport");

const signUp = require("../controllers/userController");

router.get("/", signUp.signUpRender);
router.get("/register", signUp.signUpController);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/login", passport.authenticate('google', { failureRedirect: '/login' }), (req, res)=>{
    res.redirect('/profile');
});

module.exports = router;
