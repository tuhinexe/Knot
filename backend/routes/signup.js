const router = require('express').Router();

const signUp = require('../controllers/signUpController');

router.route('/').get(signUp.signUpRender).post(signUp.signUpController);

module.exports = router;