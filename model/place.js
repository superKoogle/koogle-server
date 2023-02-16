const {sequelize, DataTypes} = require('./sequelize');
const Place = sequelize.define(
        "place",
        {
            place_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            place_name: {
                type: DataTypes.STRING(45),
            },
            place_address: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },
            place_lat:{
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            place_lng:{
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            place_hours:{
                type: DataTypes.STRING(65),
            },
            place_img:{
                type: DataTypes.STRING(100),
            },
            place_info_by:{
                type: DataTypes.INTEGER,
            },
            place_type:{
                type: DataTypes.STRING(45),
                allowNull: false,
            }

        },
        {
            timestamps: false,
        }
    );
module.exports = Place;