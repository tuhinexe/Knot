const router = require('express').Router();
const pollsController = require('../controllers/pollController');
const checkAuthorized = require("../middlewares/checkAuth.js");

router.route('/').get(checkAuthorized, pollsController.pollsRender)

router.route('/create').get(checkAuthorized,pollsController.createPollsRender).post(checkAuthorized, pollsController.pollsController);


module.exports = router;
