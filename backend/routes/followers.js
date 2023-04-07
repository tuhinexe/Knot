const router = require('express').Router();
const controller = require('../controllers/followersController');

router.route('/followers').get(controller.followersRender);
router.route('/following').get(controller.followingRender);
router.route('/followers/:profileId').get(controller.viewProfileFollowersRender);
router.route('/following/:profileId').get(controller.viewProfileFollowingRender);

module.exports = router;