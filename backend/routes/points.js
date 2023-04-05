const router = require('express').Router();
const points = require('../controllers/pointsController');

router.get('/', points.pointsController);


module.exports = router;