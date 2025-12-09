const { v4: uuidv4 } = require("uuid");
const Crew = require("../models/Crew");

// Get all crew for a specific event
async function getCrewByEvent(eventId) {
  return await Crew.findAll({ where: { event_id: eventId } });
}

async function addCrew(eventId, crewList) {
  const crewToInsert = crewList.map((member) => ({
    id: uuidv4(),
    event_id: eventId,
    names: member.names,
    role: member.role,
    start_time: member.start_time,
    end_time: member.end_time,
  }));

  return await Crew.bulkCreate(crewToInsert);
}
async function updateCrew(id, data) {
  const crew = await Crew.findByPk(id);
  if (!crew) throw new Error("Crew not found");

  return await crew.update({
    names: data.names !== undefined ? data.names : crew.names,
    role: data.role !== undefined ? data.role : crew.role,
    start_time:
      data.start_time !== undefined ? data.start_time : crew.start_time,
    end_time: data.end_time !== undefined ? data.end_time : crew.end_time,
  });
}
async function deleteCrew(id) {
  const deletedCount = await Crew.destroy({ where: { id } });
  if (deletedCount === 0) throw new Error("Crew not found");
  return true;
}

async function deleteCrewByEvent(eventId) {
  await Crew.destroy({ where: { event_id: eventId } });
}

module.exports = {
  getCrewByEvent,
  addCrew,
  updateCrew,
  deleteCrew,
  deleteCrewByEvent,
};
