const eventService = require('../services/eventService');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, '../../images');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({ storage, fileFilter });


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
    const pictureFile = req.file;
    let picture_path = null;
    if (pictureFile) {
      picture_path = `/images/${pictureFile.filename}`;
    }

    const newEvent = await eventService.createEvent({
      ...req.body,
      picture_path,
    });

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteEvent(req, res) {
  try {
    console.log("deleting event!");
    await eventService.deleteEvent(req.params.id);
    res.status(200).json({message: 'Event was deleted'});
  }
  catch (error) {
    res.status(500).json({error: error.message});
  }
}

async function updateEvent(req, res) {
  try {
    const pictureFile = req.file;
    let picture_path = req.body.picture_path; 

    if (pictureFile) {
      picture_path = `/images/${pictureFile.filename}`;
    }

    await eventService.updateEvent(req.params.id, {
      ...req.body,
      picture_path,
    });

    res.status(200).json({ message: 'Event was updated' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update event', error: error.message });
  }
}
module.exports = {
  getEvent,
  getEvents,
  createEvent,
  deleteEvent,
  updateEvent,
  upload
};
