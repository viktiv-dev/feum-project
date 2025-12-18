const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Inventory = sequelize.define('Inventory', {
  id: { type: DataTypes.CHAR(36), primaryKey: true },
  product_id: { type: DataTypes.CHAR(36), allowNull: false },
  current_stock: { type: DataTypes.INTEGER, allowNull: false },
  minimum_stock: { type: DataTypes.INTEGER, allowNull: false },
  need_to_order: { type: DataTypes.INTEGER, allowNull: false },
  ordered_actual: { type: DataTypes.INTEGER, allowNull: false },
  storage_actual: { type: DataTypes.INTEGER, allowNull: false },
  storage_after_event: { type: DataTypes.INTEGER, allowNull: false },
  status_after_event: { type: DataTypes.STRING(50), allowNull: false },
}, {
  tableName: 'inventory',
  timestamps: false
});

module.exports = {Inventory}