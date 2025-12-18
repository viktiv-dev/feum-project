const  BarSale  = require("../models/BarSale");
const Product = require("../models/Product");
const  Drink = require("../models/Drink");
const Event = require("../models/Event");
const { v4: uuidv4 } = require("uuid");

async function getBarSales() {
  return await BarSale.findAll();
}

async function getBarSale(id) {
  return await BarSale.findByPk(id);
}

async function getBarSalesByEvent(eventId) {
  return await BarSale.findAll({ where: { event_id: eventId } });
}

async function createBarSale(data) {
  const {
    product_id,
    drink_id,
    event_id,
    quantity,
    sale_date
  } = data;

  if (!quantity || quantity <= 0) {
    throw new Error("Quantity must be greater than 0");
  }

  let productName = null;
  let drinkName = null;
  let eventName = null;

  if (product_id) {
    const product = await Product.findByPk(product_id);
    if (!product) {
      throw new Error("Product not found");
    }
    productName = product.name;
  }

  if (drink_id) {
    const drink = await Drink.findByPk(drink_id);
    if (!drink) {
      throw new Error("Drink not found");
    }
    drinkName = drink.name;
  }

  if (!product_id && !drink_id) {
    throw new Error("Either product or drink must be provided");
  }

  if (event_id) {
    const event = await Event.findByPk(event_id);
    if (!event) {
      throw new Error("Event not found");
    }
    eventName = event.name;
  }

  return await BarSale.create({
    id: uuidv4(),
    product_id,
    drink_id,
    event_id,
    product_name: productName,
    drink_name: drinkName,
    event_name: eventName,
    quantity,
    sale_date
  });
}

async function updateBarSale(id, data) {
  const sale = await BarSale.findByPk(id);
  if (!sale) {
    throw new Error("Bar sale not found");
  }

  let productName = sale.product_name;
  let drinkName = sale.drink_name;
  let eventName = sale.event_name;

  if (data.product_id && data.product_id !== sale.product_id) {
    const product = await Product.findByPk(data.product_id);
    if (!product) {
      throw new Error("Product not found");
    }
    productName = product.name;
  }

  if (data.drink_id && data.drink_id !== sale.drink_id) {
    const drink = await Drink.findByPk(data.drink_id);
    if (!drink) {
      throw new Error("Drink not found");
    }
    drinkName = drink.name;
  }

  if (data.event_id !== undefined && data.event_id !== sale.event_id) {
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

  return await sale.update({
    product_id: data.product_id ?? sale.product_id,
    drink_id: data.drink_id ?? sale.drink_id,
    event_id: data.event_id ?? sale.event_id,
    product_name: productName,
    drink_name: drinkName,
    event_name: eventName,
    quantity: data.quantity ?? sale.quantity,
    sale_date: data.sale_date ?? sale.sale_date
  });
}

async function deleteBarSale(id) {
  const sale = await BarSale.findByPk(id);
  if (!sale) {
    throw new Error("Bar sale not found");
  }

  return await BarSale.destroy({ where: { id } });
}

module.exports = {
  getBarSale,
  getBarSales,
  createBarSale,
  updateBarSale,
  deleteBarSale,
  getBarSalesByEvent
};
