const router = require('express').Router();
const pollsController = require('../controllers/pollController');
const checkAuthorized = require("../middlewares/checkAuth.js");

router.route('/').get(pollsController.pollsRender)
router.post('/vote',pollsController.voteController);
router.route('/add').get(pollsController.createPollsRender).post(checkAuthorized, pollsController.createPollsController);
router.route('/delete/:pollId').get(pollsController.deletePollController);



module.exports = router;
