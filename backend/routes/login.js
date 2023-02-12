const router = require('express').Router();
const controller = require('../controllers/userController');

// const login = require('../controllers/loginController');


router.route('/').get(controller.loginRender).post(controller.loginController);

module.exports = router;


