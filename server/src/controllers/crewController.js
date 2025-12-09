const crewService = require('../services/crewService');

async function getCrewByEvent(req, res) {
    try {
        const crew = await crewService.getCrewByEvent(req.params.id);
        res.json(crew)
    }
    catch (error){
        console.error(error);
        res.status(500).json({error: 'Failed to fetch crew'});
    }
}

async function addCrew(req, res) {
    try {
      const crew = await crewService.addCrew(req.params.id, req.body);
      res.status(201).json(crew);
    }
    catch (error) {
      console.error(error);
      res.status(500).json({error: "Failed to create crew"})
    }
}

async function deleteCrew(req, res) {
    try {
      await crewService.deleteCrew(req.params.id);
      res.status(200).json({message: "Crew has been deleted"})
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({error: error.message})
    }
}

async function updateCrew(req, res) {
    try {
      await crewService.updateCrew(req.params.id, req.body);
      res.status(200).json({message: 'Crew was updated'})
    } catch (error) {
      console.error(error);
      res.status(500).json({error: 'Failed to update crew'})
    }
}

async function deleteCrewByEvent(req, res) {
    try {
      await crewService.deleteCrewByEvent(req.params.id);
      res.status(200).json({message: "All crew for event was deleted"})
    } catch (error) {
      console.error(error);
      res.status(500).json({message: "Failed to delete crew for event"})
    }
}

module.exports = {
    getCrewByEvent,
    addCrew,
    deleteCrew,
    updateCrew,
    deleteCrewByEvent
}