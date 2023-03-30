const router = require('express').Router();
const pollsController = require('../controllers/pollController');
const checkAuthorized = require("../middlewares/checkAuth.js");

router.route('/').get(pollsController.pollsRender)
router.post('/vote',pollsController.voteController);
router.route('/create').get(pollsController.createPollsRender).post(checkAuthorized, pollsController.createPollsController);


module.exports = router;
