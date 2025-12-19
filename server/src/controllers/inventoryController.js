const inventoryService = require("../services/inventoryService");
const sequelize = require("../config/database");
const barSaleService = require("../services/barSaleService")

async function getInventory(req, res) {
  try {
    const inventory = await inventoryService.getInventory(req.params.id);
    res.json(inventory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch inventory record" });
  }
}

async function saveInventoryWithBarSales(req, res) {
  const { event_id, inventoryRows = [], barSales = [] } = req.body;
  if (!event_id) return res.status(400).json({ error: "event_id required" });

  const t = await sequelize.transaction();
  try {
    for (const row of inventoryRows) {
      await inventoryService.createInventory(row, { transaction: t }); 
    }

    for (const sale of barSales) {
      if (sale.existingId) {
        if (sale.quantity > 0) {
          await barSaleService.updateBarSale(sale.existingId, { quantity: sale.quantity }, { transaction: t });
        } else {
          await barSaleService.deleteBarSale(sale.existingId, { transaction: t });
        }
      } else {
        if (sale.quantity > 0) {
          await barSaleService.createBarSale({
            product_id: sale.type === "product" ? sale.product_id : null,
            drink_id: sale.type === "drink" ? sale.drink_id : null,
            event_id,
            quantity: sale.quantity,
          }, { transaction: t });
        }
      }
    }

    await t.commit();
    return res.status(200).json({ message: "Saved inventory and bar sales" });
  } catch (err) {
    await t.rollback();
    console.error("saveInventoryWithBarSales error:", err);
    return res.status(500).json({ error: "Failed to save inventory and bar sales" });
  }
}

async function getInventories(req, res) {
  try {
    const inventories = await inventoryService.getInventories();
    res.json(inventories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch inventory records" });
  }
}

async function getInventoryByEvent(req, res) {
    try {
        const inventories = await inventoryService.getInventoryByEvent(req.params.id);
        res.json(inventories)
    }
    catch (error){
        console.error(error);
        res.status(500).json({error: 'Failed to fetch crew'});
    }
}

async function getInventoryByEventName(req, res) {
  try {
    const eventName = req.params;
    const data = await inventoryService.getInventoryByEventName(eventName);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


async function createInventory(req, res) {
  try {
    const inventory = await inventoryService.createInventory(req.body);
    res.status(201).json(inventory);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

async function updateInventory(req, res) {
  try {
    await inventoryService.updateInventory(req.params.id, req.body);
    res.status(200).json({ message: "Inventory updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

async function deleteInventory(req, res) {
  try {
    await inventoryService.deleteInventory(req.params.id);
    res.status(200).json({ message: "Inventory deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
}

async function deleteInventoryByEvent(req, res) {
    try {
      await barSaleService.deleteBarSalesByEvent(req.params.id);
      await inventoryService.deleteInventoryByEvent(req.params.id);
      res.status(200).json({message: "Inventory for event was deleted"})
    } catch (error) {
      console.error(error);
      res.status(500).json({message: "Failed to delete crew for event"})
    }
}

module.exports = {
  getInventory,
  getInventories,
  getInventoryByEvent,
  getInventoryByEventName,
  createInventory,
  updateInventory,
  deleteInventory,
  deleteInventoryByEvent,
  saveInventoryWithBarSales
};
