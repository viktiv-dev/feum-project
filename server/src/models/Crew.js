const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Crew = sequelize.define('Crew', {
    id: { type: DataTypes.CHAR(36), primaryKey: true },
    event_id: { type: DataTypes.CHAR(36), allowNull: false },
    names: { type: DataTypes.STRING(1024), allowNull: false },
    role: { type: DataTypes.STRING(255), allowNull: false },
    start_time: { type: DataTypes.TIME },
    end_time: { type: DataTypes.TIME },
    group_number: {type: DataTypes.DECIMAL(4, 2), allowNull: false}
}, {
    tableName: 'crew',
    timestamps: false, 
});



module.exports = Crew;
