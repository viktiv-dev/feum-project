const express = require('express');
const router = express.Router();
const crewController = require('../controllers/crewController');

router.get('/event/:id', crewController.getCrewByEvent);
router.post('/event/:id', crewController.addCrew);
router.delete('/:id', crewController.deleteCrew);
router.patch('/:id', crewController.updateCrew);
router.delete('/event/:id', crewController.deleteCrewByEvent)

module.exports = router;
