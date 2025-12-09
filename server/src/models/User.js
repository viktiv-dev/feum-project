const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: { type: DataTypes.CHAR(36), primaryKey: true },
    email: { type: DataTypes.STRING(255), allowNull: false},
    password: { type: DataTypes.STRING(255), allowNull: false },
    username: { type: DataTypes.STRING(255), allowNull: true }
}, {
    tableName: 'user',
    timestamps: false
});

module.exports = User;
