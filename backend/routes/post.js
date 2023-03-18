const router = require('express').Router();
const controller = require('../controllers/postController');
const checkAuthorized = require("../middlewares/checkAuth.js");


router.route('/add').get(checkAuthorized, controller.createPostRender).post(checkAuthorized, controller.createPostController);
router.route('/:id').get(checkAuthorized, controller.getSinglePostRender)
router.route("/:postId/comment").post(controller.addCommentController);
router.route('/delete').post(checkAuthorized, controller.deletPostController);

module.exports = router;
