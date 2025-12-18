const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Drink = sequelize.define('Drink', {
  id: { type: DataTypes.CHAR(36), primaryKey: true },
  name: { type: DataTypes.STRING(255), allowNull: false },
  alcohol_id: {type: DataTypes.CHAR(36)},
  alcohol_ml: { type: DataTypes.FLOAT },
  mixer_id: {type: DataTypes.CHAR(36)},
  mixer_ml: { type: DataTypes.FLOAT }
}, {
  tableName: 'drink',
  timestamps: false
});

module.exports = Drink