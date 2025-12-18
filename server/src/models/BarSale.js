const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BarSale = sequelize.define('BarSale', {
  id: { type: DataTypes.CHAR(36), primaryKey: true },
  product_id: { type: DataTypes.CHAR(36), allowNull: true },
  drink_id: { type: DataTypes.CHAR(36), allowNull: true},
  event_id: { type: DataTypes.CHAR(36), allowNull: true },
  product_name: { type: DataTypes.STRING(255), allowNull: true },
  drink_name: { type: DataTypes.STRING(255), allowNull: true },
  event_name: { type: DataTypes.STRING(255), allowNull: true },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  sale_date: { type: DataTypes.DATEONLY}
}, {
  tableName: 'bar_sale',
  timestamps: false
});

module.exports = BarSale