const {sequelize, DataTypes} = require('./sequelize');
const Habad = sequelize.define(
        "habad",
        {
            habad_id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            habad_intermediary: {
                type: DataTypes.STRING(45),
            },
            habad_phone: {
                type: DataTypes.STRING(12),
            },
            habad_site_link:{
                type: DataTypes.STRING(200),
            }
        },
        {
            timestamps: false,
        }
    );
    
module.exports = Habad;