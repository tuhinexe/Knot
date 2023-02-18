const router = require("express").Router();
const controller = require("../controllers/postController");
const getSignature = require("../api/getSignature");

router.route("/post/upvote").post(controller.likeCountController);
router.route("/post/downvote").post(controller.dislikeCountController);
router.route("/get-signature").post(getSignature);

module.exports = router;
