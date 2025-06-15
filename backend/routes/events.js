const express = require('express');
const router = express.Router();
const { getAllEvents, getEvents, getEventByID } = require('../controllers/eventsController');

router.get('/', getAllEvents);
router.get('/filterEvents', getEvents);
router.get(`/:id`, getEventByID)

module.exports = router;