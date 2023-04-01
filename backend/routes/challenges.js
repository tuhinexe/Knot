const router = require('express').Router();
const challengesController = require('../controllers/challengesController');
const checkAuthorized = require("../middlewares/checkAuth.js");

router.route('/').get(checkAuthorized, challengesController.challengesRender);
router.route('/add').get(checkAuthorized, challengesController.createChallengeRender).post(checkAuthorized, challengesController.createChallengeController);
router.get('/:id', checkAuthorized, challengesController.viewOneChallengeRender);
router.get('/participate/:id', checkAuthorized, challengesController.participateInChallengeRender);
module.exports = router;
