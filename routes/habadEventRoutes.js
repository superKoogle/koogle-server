const express = require('express')
const router = express.Router()
const habad_eventController = require('../controllers/habadEventController.js')


router.route('/')
    .get(habad_eventController.getAllEvents)
    .post(habad_eventController.addNewEvent)
router.route('/:id')
    .delete(habad_eventController.deleteEvent)
    .get(habad_eventController.getEventsByHabadId)
    .put(habad_eventController.updateEventByEventId)
module.exports = router