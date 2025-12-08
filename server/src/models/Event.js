// server/src/models/Event.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Event = sequelize.define('Event', {
  id: { type: DataTypes.CHAR(36), primaryKey: true },
  name: { type: DataTypes.STRING(255) },
  event_date: { type: DataTypes.DATE },
  location: { type: DataTypes.STRING(1024) },
  lineup: { type: DataTypes.STRING(1024) },
  picture_path: { type: DataTypes.STRING(1024) },
  price: { type: DataTypes.FLOAT },
  genre: { type: DataTypes.STRING(1024) },
  description: { type: DataTypes.STRING(8192) },
}, {
  tableName: 'event',
  timestamps: false, // disable if table doesn’t have createdAt/updatedAt
});


module.exports = Event;
