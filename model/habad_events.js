const {sequelize, DataTypes} = require('./sequelize');
const Habad_Events = sequelize.define(
        "habad_events",
        {
            event_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement:true
            },
            habad_id: {
                type: DataTypes.INTEGER,
            },
            event_desc: {
                type: DataTypes.STRING(80),
            },
            event_date:{
                type: DataTypes.DATE,
            },
            event_with_food:{
                type:DataTypes.TINYINT
            }
        },
        {
            timestamps: false,
        }
    );
    
module.exports = Habad_Events;