const express = require('express');
const router = express.Router();
const { getAllEvents, getEvents } = require('../controllers/eventsController');

router.get('/', getAllEvents);
router.get('/filterEvents', getEvents);

module.exports = router;