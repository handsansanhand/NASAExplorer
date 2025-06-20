const express = require('express');
const router = express.Router();
const { getNearMissObjects, getTimelineOfAsteroid } = require('../controllers/nearEarthController');

router.get('/', getNearMissObjects)
router.get(`/asteroid/:id`, getTimelineOfAsteroid)

module.exports = router;
