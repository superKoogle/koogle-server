const { sequelize, DataTypes } = require('./sequelize');

const Restaurant = sequelize.define(
    "restaurant",
    {
        restaurant_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        res_phone_number: {
            type: DataTypes.STRING(12),
        },
        res_type: {
            type: DataTypes.INTEGER,
        },
        res_hechsher: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        res_site_link: {
            type: DataTypes.STRING(200),
        },
        res_stars: {
            type: DataTypes.INTEGER,
        }

    },
    {
        timestamps: false,
    }
);

module.exports = Restaurant;