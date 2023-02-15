const router = require("express").Router();
const controller = require("../controllers/postController");
const checkAuthorized = require("../middlewares/checkAuth.js");

router.route("/upvote").post(controller.likeCountController);
router.route("/downvote").post(controller.dislikeCountController);

module.exports = router;
