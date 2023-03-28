
const router = require('express').Router();
const controller = require('../controllers/profileController');
const checkAuthorized = require("../middlewares/checkAuth.js");


router.route('/').get(checkAuthorized, controller.viewProfileRender);
router.route('/:profileId').get(checkAuthorized, controller.singleProfileRender);
router.get('/follow/:followingId',checkAuthorized, controller.followController)
router.get("/update",controller.editProfileRender);
router.route("/update").get(controller.editProfileRender).post(controller.editProfileController);
module.exports = router;
