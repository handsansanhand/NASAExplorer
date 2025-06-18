const express = require('express');
const router = express.Router();
const { getNearMissObjects } = require('../controllers/nearEarthController');

router.get('/', getNearMissObjects)

module.exports = router;
