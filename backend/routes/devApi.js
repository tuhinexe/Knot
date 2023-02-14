const router = require("express").Router();
const controller = require("../controllers/postController");
const checkAuthorized = require("../middlewares/checkAuth.js");

router.route("/upvote").get(controller.likeCountController);

module.exports = router;
