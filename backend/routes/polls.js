const router = require('express').Router();
const pollsController = require('../controllers/pollController');
const checkAuthorized = require("../middlewares/checkAuth.js");

router.route('/create').get(checkAuthorized, pollsController.pollsRender).post(checkAuthorized, pollsController.pollsController);

// router.route('/view').get(checkAuthorized, pollsController.pollsRender).post(checkAuthorized, pollsController.pollsController);


module.exports = router;
