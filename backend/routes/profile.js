
const router = require('express').Router();
const controller = require('../controllers/profileController');
const checkAuthorized = require("../middlewares/checkAuth.js");


router.route('/').get(checkAuthorized, controller.viewProfileRender);
router.route('/activity').get(checkAuthorized, controller.viewActivityRender);
router.route("/update").get(controller.editProfileRender).post(controller.editProfileController);
router.get('/follow/:followingId',checkAuthorized, controller.followController)
router.route('/:profileId').get(checkAuthorized, controller.singleProfileRender);

module.exports = router;
