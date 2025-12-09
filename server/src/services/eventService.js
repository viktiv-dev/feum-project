const Event = require("../models/Event");
const { v4: uuidv4 } = require("uuid");

async function getEvents() {
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
    description,
  });
}

async function deleteEvent(id) {
  if (!(await Event.findByPk(id))) {
    throw new Error("Event not found");
  }
  return await Event.destroy({ where: { id } });
}

async function updateEvent(id, data) {
  const event = await Event.findByPk(id);
  if(!event) {
    throw new Error("Event not found!")
  }
  return await event.update({
    name: data.name !== undefined ? data.name : event.name,
    event_date: data.event_date !== undefined ? data.event_date : event.event_date,
    location: data.location !== undefined ? data.location : event.location,
    lineup: data.lineup !== undefined ? data.lineup : event.lineup,
    picture_path: data.picture_path !== undefined ? data.picture_path : event.picture_path,
    price: data.price !== undefined ? data.price : event.price,
    genre: data.genre !== undefined ? data.genre : event.genre,
    description: data.description !== undefined ? data.description : event.description,
  })
}

module.exports = {
  getEvent,
  getEvents,
  createEvent,
  deleteEvent,
  updateEvent
};
