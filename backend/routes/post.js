
const router = require('express').Router();
const controller = require('../controllers/postController');
const checkAuthorized = require("../middlewares/checkAuth.js");


router.route('/add').get(checkAuthorized, controller.createPostRender).post(checkAuthorized, controller.createPostController);

router.route('/view').get(checkAuthorized, controller.viewPostRender).post(checkAuthorized, controller.viewPostController);


module.exports = router;
