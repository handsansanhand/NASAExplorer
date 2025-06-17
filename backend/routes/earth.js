const express = require('express');
const router = express.Router();
const { getImage } = require('../controllers/earthController')

router.get('/', getImage);

module.exports = router;