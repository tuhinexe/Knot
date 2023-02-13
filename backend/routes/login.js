const router = require('express').Router();
const controller = require('../controllers/userController');
const checkNotAuthorized = require("../middlewares/notAuth.js");


router.route('/').get(checkNotAuthorized, controller.loginRender).post(controller.loginController);

module.exports = router;


