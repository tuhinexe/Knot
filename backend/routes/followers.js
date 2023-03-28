const router = require('express').Router();
const controller = require('../controllers/followersController');

router.route('/followers').get(controller.followersRender);
router.route('/following').get(controller.followingRender);

module.exports = router;