const drinkService = require("../services/drinkService");

async function getDrink(req, res) {
  try {
    const drink = await drinkService.getDrink(req.params.id);
    res.json(drink);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch drink" });
  }
}

async function getDrinks(req, res) {
  try {
    const drinks = await drinkService.getDrinks();
    res.json(drinks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch all drinks" });
  }
}

async function createDrink(req, res) {
  try {
    const drink = await drinkService.createDrink(req.body);
    res.status(201).json(drink);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create drink" });
  }
}

async function deleteDrink(req, res) {
  try {
    await drinkService.deleteDrink(req.params.id);
    res.status(200).json({ message: "Drink has been deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

async function updateDrink(req, res) {
  try {
    await drinkService.updateDrink(req.params.id, req.body);
    res.status(200).json({ message: "Drink was updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update drink" });
  }
}

module.exports = {
  getDrink,
  getDrinks,
  createDrink,
  deleteDrink,
  updateDrink
};
