const {sequelize, DataTypes} = require('./sequelize');

    const Supermarket = sequelize.define(
        "supermarket",
        {
            supermarket_id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            market_phone: {
                type: DataTypes.STRING(12),
            },
            market_site_link:{
                type: DataTypes.STRING(45),
            }
        },
        {
            timestamps: false,
        }
    );

    module.exports = Supermarket

