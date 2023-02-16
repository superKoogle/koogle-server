const {sequelize, DataTypes} = require('./sequelize');
    const Synagogue = sequelize.define(
        "synagogue",
        {
            synagogue_id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            syn_nusach:{
                type: DataTypes.INTEGER
            }
        },
        {
            timestamps: false,
        }
    );

    module.exports = Synagogue;