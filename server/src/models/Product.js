const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: { type: DataTypes.CHAR(36), primaryKey: true },
  name: { type: DataTypes.STRING(255), allowNull: false },
  category: { type: DataTypes.STRING(50), allowNull: false },
  unit: { type: DataTypes.STRING(20) },
  volume_per_unit: { type: DataTypes.FLOAT },
  for_sale: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  minimum_stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0}
}, {
  tableName: 'product',
  timestamps: false
});

module.exports = Product