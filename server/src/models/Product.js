const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: { type: DataTypes.CHAR(36), primaryKey: true },
  name: { type: DataTypes.STRING(255), allowNull: false },
  category: { type: DataTypes.STRING(50), allowNull: false },
  unit: { type: DataTypes.STRING(20) },
  volume_per_unit: { type: DataTypes.FLOAT }
}, {
  tableName: 'product',
  timestamps: false
});

module.exports = {Product}