const Event = require("../models/Product");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

async function getProducts() {
 
  return await Product.findAll();
}

async function getProduct(id) {
  return await Product.findByPk(id);
}

async function createProduct(data) {
  const {
    name,
    category,
    unit,
    volume_per_unit
  } = data;

  if (!name || name.trim() === "") {
    throw new Error("Product name is required!");
  }

  return await Product.create({
    id: uuidv4(),
    name: name.trim(),
    category,
    unit,
    volume_per_unit
  });
}

async function deleteProduct(id) {
  const product = await Product.findByPk(id);
  if (!product) {
    throw new Error("Product not found");
  }
  return await Product.destroy({ where: { id } });
}

async function updateProduct(id, data) {
  const product = await Product.findByPk(id);
  if (!product) throw new Error("Product not found!");

  return await product.update({
    name: data.name !== undefined ? data.name : product.name,
    category: data.category !== undefined ? data.category : product.category,
    unit: data.unit !== undefined ? data.unit : product.unit,
    volume_per_unit: data.volume_per_unit !== undefined ? data.volume_per_unit : product.volume_per_unit
  });
}

module.exports = {
  getProduct,
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct
};
