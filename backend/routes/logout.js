const router = require('express').Router();
const controller = require('../controllers/userController');
const checkAuthorized = require("../middlewares/checkAuth.js");


router.route('/').post(checkAuthorized, controller.logoutController);

module.exports = router;
