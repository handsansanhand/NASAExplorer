
const express = require('express');
const router = express.Router();
const { getDailyImage } = require('../controllers/dailyImageController');


router.get('/', getDailyImage);

module.exports = router;