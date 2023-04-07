const router = require("express").Router();
const passport = require("passport");
const checkNotAuthorized = require("../middlewares/notAuth.js");

const signUp = require("../controllers/userController");
router
  .route("/")
  .get(checkNotAuthorized, signUp.signUpRender)
  .post(signUp.signUpController);


module.exports = router;

