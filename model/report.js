const {sequelize, DataTypes} = require('./sequelize');
    const Report = sequelize.define(
        "report",
        {
            report_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            report_by_user: {
                type: DataTypes.INTEGER,
            },
            report_place_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            report_text:{
                type: DataTypes.STRING(100),
            }
        },
        {
            timestamps: false,
        }
    );
   
module.exports = Report;