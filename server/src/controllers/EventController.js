// server/src/controllers/EventController.js
const Event = require('../models/Event');
const { v4: uuidv4 } = require('uuid'); // for generating UUIDs

// GET /api/events
const getEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// POST /api/events
const createEvent = async (req, res) => {
  try {
    const { name, event_date, location, lineup, picture_path, price, genre, description } = req.body;

    // Basic validation
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Event name is required' });
    }

    const newEvent = await Event.create({
      id: uuidv4(),
      name: name.trim(),
      event_date: event_date || null,
      location: location || null,
      lineup: lineup || null,
      picture_path: picture_path || null,
      price: price || null,
      genre: genre || null,
      description: description || null,
    });

    res.status(201).json(newEvent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create event' });
  }
};

module.exports = { getEvents, createEvent };
