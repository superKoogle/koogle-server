const {sequelize, DataTypes} = require('./sequelize');
const Host = sequelize.define(
        "host",
        {
            host_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            host_start_date: {
                type: DataTypes.DATE,
            },
            host_end_date: {
                type: DataTypes.DATE,
            },
            host_always:{
                type: DataTypes.TINYINT,
               
            },
            host_max_guests:{
                type: DataTypes.INTEGER,
               
            },
            host_min_age:{
                type: DataTypes.INTEGER,
            },
            host_type:{
                type: DataTypes.TINYINT,
            },
            user_id:{
                type: DataTypes.INTEGER,
            }
        },
        {
            timestamps: false,
        }
    );

module.exports = Host