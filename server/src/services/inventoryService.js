const Inventory = require("../models/Inventory");
const Product = require("../models/Product");
const Event = require("../models/Event");
const { v4: uuidv4 } = require("uuid");

async function getInventories() {
  return await Inventory.findAll();
}

async function getInventory(id) {
  return await Inventory.findByPk(id);
}

async function getInventoryByEvent(eventId) {
  return await Inventory.findAll({ where: { event_id: eventId } });
}

async function getInventoryByEventName(eventName) {
  if (!eventName) {
    throw new Error("Event name is required");
  }

  return await Inventory.findAll({
    where: { event_name: eventName },
    order: [["product_name", "ASC"]],
  });
}


async function createInventory(data) {
  const {
    product_id,
    event_id,
    current_stock,
    minimum_stock,
    need_to_order,
    ordered_actual,
    storage_actual,
    storage_after_event,
    status_after_event
  } = data;

  if (!product_id) {
    throw new Error("Product is required for inventory");
  }

  const product = await Product.findByPk(product_id);
  if (!product) {
    throw new Error("Product not found");
  }

  let eventName = null;
  if (event_id) {
    const event = await Event.findByPk(event_id);
    if (!event) {
      throw new Error("Event not found");
    }
    eventName = event.name;
  }

  return await Inventory.create({
    id: uuidv4(),
    product_id,
    event_id,
    product_name: product.name,
    event_name: eventName,
    current_stock,
    minimum_stock,
    need_to_order,
    ordered_actual,
    storage_actual,
    storage_after_event,
    status_after_event
  });
}

async function updateInventory(id, data) {
  const inventory = await Inventory.findByPk(id);
  if (!inventory) {
    throw new Error("Inventory record not found");
  }

  let productName = inventory.product_name;
  let eventName = inventory.event_name;

  if (data.product_id && data.product_id !== inventory.product_id) {
    const product = await Product.findByPk(data.product_id);
    if (!product) {
      throw new Error("Product not found");
    }
    productName = product.name;
  }

  if (data.event_id !== undefined && data.event_id !== inventory.event_id) {
    if (data.event_id === null) {
      eventName = null;
    } else {
      const event = await Event.findByPk(data.event_id);
      if (!event) {
        throw new Error("Event not found");
      }
      eventName = event.name;
    }
  }

  return await inventory.update({
    product_id: data.product_id !== undefined ? data.product_id : inventory.product_id,
    event_id: data.event_id !== undefined ? data.event_id : inventory.event_id,
    product_name: productName,
    event_name: eventName,
    current_stock: data.current_stock ?? inventory.current_stock,
    minimum_stock: data.minimum_stock ?? inventory.minimum_stock,
    need_to_order: data.need_to_order ?? inventory.need_to_order,
    ordered_actual: data.ordered_actual ?? inventory.ordered_actual,
    storage_actual: data.storage_actual ?? inventory.storage_actual,
    storage_after_event: data.storage_after_event ?? inventory.storage_after_event,
    status_after_event: data.status_after_event ?? inventory.status_after_event
  });
}

async function deleteInventory(id) {
  const inventory = await Inventory.findByPk(id);
  if (!inventory) {
    throw new Error("Inventory record not found");
  }

  return await Inventory.destroy({ where: { id } });
}

async function deleteInventoryByEvent(eventId) {
  await Inventory.destroy({ where: { event_id: eventId } });
}

module.exports = {
  getInventory,
  getInventories,
  getInventoryByEvent,
  getInventoryByEventName,
  createInventory,
  updateInventory,
  deleteInventory,
  deleteInventoryByEvent
};
