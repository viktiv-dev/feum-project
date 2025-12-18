const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DrinkSale = sequelize.define('DrinkSale', {
  id: { type: DataTypes.CHAR(36), primaryKey: true },
  product_id: { type: DataTypes.CHAR(36), allowNull: true },
  drink_id: { type: DataTypes.CHAR(36), allowNull: true},
  event_id: { type: DataTypes.CHAR(36), allowNull: false },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  sale_date: { type: DataTypes.DATEONLY}
}, {
  tableName: 'drink_sale',
  timestamps: false
});

module.exports = {DrinkSale}