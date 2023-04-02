const router = require('express').Router();
const controller = require('../controllers/postController');
const {addCommentController,deleteCommentController} = require('../controllers/commentController')
const checkAuthorized = require("../middlewares/checkAuth.js");


router.route('/add').get(checkAuthorized, controller.createPostRender).post(checkAuthorized, controller.createPostController);
router.route('/delete').post(checkAuthorized, controller.deletePostController);
router.route('/:postId').get(checkAuthorized, controller.getSinglePostRender)
router.route("/:postId/comment").post(addCommentController).delete(deleteCommentController)

module.exports = router;
