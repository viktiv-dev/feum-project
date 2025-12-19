const Event = require("../models/Event");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

async function getEvents() {
  console.log("Events listed");
  return await Event.findAll();
}

async function getEvent(id) {
  return await Event.findByPk(id);
}

async function createEvent(data) {
  const {
    name,
    event_date,
    location,
    lineup,
    picture_path,
    price,
    genre,
    is_public,
    description,
  } = data;

  if (!name || name.trim() === "") {
    throw new Error("Event name is required");
  }

  return await Event.create({
    id: uuidv4(),
    name: name.trim(),
    event_date,
    location,
    lineup,
    picture_path,
    price,
    genre,
    is_public,
    description,
  });
}

async function deleteEvent(id) {
  const event = await Event.findByPk(id);
  if (!event) {
    throw new Error("Event not found");
  }

  if (event.picture_path) {
    const imagePath = path.join(__dirname, "../../", event.picture_path);
    fs.unlink(imagePath, (err) => {
      if (err) console.error("Failed to delete image:", err);
    });
  }

  return await Event.destroy({ where: { id } });
}

async function updateEvent(id, data) {
  const event = await Event.findByPk(id);
  if (!event) throw new Error("Event not found!");

  if (
    data.picture_path &&
    event.picture_path &&
    data.picture_path !== event.picture_path
  ) {
    const oldImagePath = path.join(__dirname, "../../", event.picture_path);
    fs.unlink(oldImagePath, (err) => {
      if (err) console.error("Failed to delete old image:", err);
    });
  }

  return await event.update({
    name: data.name !== undefined ? data.name : event.name,
    event_date:
      data.event_date !== undefined ? data.event_date : event.event_date,
    location: data.location !== undefined ? data.location : event.location,
    lineup: data.lineup !== undefined ? data.lineup : event.lineup,
    picture_path:
      data.picture_path !== undefined ? data.picture_path : event.picture_path,
    price: data.price !== undefined ? data.price : event.price,
    genre: data.genre !== undefined ? data.genre : event.genre,
    description:
      data.description !== undefined ? data.description : event.description,
    is_public: data.is_public !== undefined ? data.is_public : event.is_public,
  });
}

async function getSortedPastPublicEvents() {
  const events = await Event.findAll({
    where: { is_public: true },
  });

  const now = new Date();

  return events
    .filter((e) => new Date(e.event_date) < now)
    .sort((a, b) => new Date(b.event_date) - new Date(a.event_date));
}

async function getSortedFuturePublicEvents() {
  const events = await Event.findAll({
    where: { is_public: true },
  });

  const now = new Date();

  return events
    .filter((e) => new Date(e.event_date) >= now)
    .sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
}

async function getNextPublicEvent() {
  const futureEvents = await getSortedFuturePublicEvents();
  return futureEvents.length > 0 ? futureEvents[0] : null;
}

module.exports = {
  getEvent,
  getEvents,
  createEvent,
  deleteEvent,
  updateEvent,
  getSortedPastPublicEvents,
  getSortedFuturePublicEvents,
  getNextPublicEvent
};
