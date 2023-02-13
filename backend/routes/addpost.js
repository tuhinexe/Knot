
const router = require('express').Router();
const controller = require('../controllers/postController');
const checkAuthorized = require("../middlewares/checkAuth.js");


router.route('/').get(checkAuthorized, controller.createPostRender);

module.exports = router;
