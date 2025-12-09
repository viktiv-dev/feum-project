const eventService = require('../services/eventService');

async function getEvents(req, res) {
  try {
    const events = await eventService.getEvents();
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
}

async function getEvent(req, res) {
  try {
    const event = await eventService.getEvent(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  }
  catch (error) {
    res.status(500).json({error: 'Failed to fetch event'});
  }
}

async function createEvent(req, res) {
  try {
    const newEvent = await eventService.createEvent(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteEvent(req, res) {
  try {
    await eventService.deleteEvent(req.params.id);
    res.status(200).json({message: 'Event was deleted'});
  }
  catch (error) {
    res.status(500).json({error: error.message});
  }
}

async function updateEvent(req, res) {
  try {
    await eventService.updateEvent(req.params.id, req.body);
    res.status(200).json({message: 'Event was updated'});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Failed to update event'})
  }
}

module.exports = {
  getEvent,
  getEvents,
  createEvent,
  deleteEvent,
  updateEvent 
};
