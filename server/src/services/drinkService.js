const Drink = require("../models/Drink");
const { v4: uuidv4 } = require("uuid");

async function getDrinks() {
  return await Drink.findAll();
}

async function getDrink(id) {
  return await Drink.findByPk(id);
}

async function createDrink(data) {
  const {
    name,
    alcohol_id,
    alcohol_ml,
    mixer_id,
    mixer_ml
  } = data;

  if (!name || name.trim() === "") {
    throw new Error("Drink name is required!");
  }

  return await Drink.create({
    id: uuidv4(),
    name: name.trim(),
    alcohol_id,
    alcohol_ml,
    mixer_id,
    mixer_ml
  });
}

async function deleteDrink(id) {
  const drink = await Drink.findByPk(id);
  if (!drink) {
    throw new Error("Drink not found");
  }

  return await Drink.destroy({ where: { id } });
}

async function updateDrink(id, data) {
  const drink = await Drink.findByPk(id);
  if (!drink) {
    throw new Error("Drink not found!");
  }

  return await drink.update({
    name: data.name !== undefined ? data.name : drink.name,
    alcohol_id: data.alcohol_id !== undefined ? data.alcohol_id : drink.alcohol_id,
    alcohol_ml: data.alcohol_ml !== undefined ? data.alcohol_ml : drink.alcohol_ml,
    mixer_id: data.mixer_id !== undefined ? data.mixer_id : drink.mixer_id,
    mixer_ml: data.mixer_ml !== undefined ? data.mixer_ml : drink.mixer_ml
  });
}

module.exports = {
  getDrink,
  getDrinks,
  createDrink,
  deleteDrink,
  updateDrink
};
