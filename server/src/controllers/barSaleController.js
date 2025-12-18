const barSaleService = require("../services/barSaleService");

async function getBarSale(req, res) {
  try {
    const sale = await barSaleService.getBarSale(req.params.id);
    res.json(sale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch bar sale" });
  }
}

async function getBarSalesByEvent(req, res) {
  try {
    const { eventId } = req.params;
    if (!eventId) return res.status(400).send("Event ID is required");

    const eventSales = await barSaleService.getBarSalesByEvent(eventId);

    res.json(eventSales);
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch bar sales for event");
  }
}

async function getBarSales(req, res) {
  try {
    const sales = await barSaleService.getBarSales();
    res.json(sales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch bar sales" });
  }
}

async function createBarSale(req, res) {
  try {
    const sale = await barSaleService.createBarSale(req.body);
    res.status(201).json(sale);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

async function updateBarSale(req, res) {
  try {
    await barSaleService.updateBarSale(req.params.id, req.body);
    res.status(200).json({ message: "Bar sale updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

async function deleteBarSale(req, res) {
  try {
    await barSaleService.deleteBarSale(req.params.id);
    res.status(200).json({ message: "Bar sale deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  getBarSale,
  getBarSales,
  createBarSale,
  updateBarSale,
  deleteBarSale,
  getBarSalesByEvent
};
