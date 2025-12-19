const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEvent);
router.post('/', eventController.upload.single('image'), eventController.createEvent);
router.patch('/:id', eventController.upload.single('image'), eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);
router.get('/past/sorted', eventController.getSortedPastPublicEvents);
router.get('/future/sorted', eventController.getSortedFuturePublicEvents);
router.get('/next', eventController.getNextPublicEvent);


module.exports = router;
