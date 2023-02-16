const { sequelize } = require("./sequelize");

const applyExtraSetup = () => {
    const { host, user, place, restaurant, synagogue, supermarket, habad, report } = sequelize.models;
    host.belongsTo(user, { foreignKey: "user_id", as: "user", onDelete:"cascade", onUpdate:"no action"});
    place.belongsTo(user, { foreignKey: "place_info_by", as: "user_inserted_place", onDelete:"no action", onUpdate:"cascade"});
    restaurant.belongsTo(place, {foreignKey:"restaurant_id", as:"place_id", onDelete:"cascade", onUpdate:"no action"})
    synagogue.belongsTo(place, {foreignKey:"synagogue_id", as:"place_id", onDelete:"cascade", onUpdate:"no action"})
    supermarket.belongsTo(place, {foreignKey:"supermarket_id", as:"place_id", onDelete:"cascade", onUpdate:"no action"})
    habad.belongsTo(place, {foreignKey:"habad_id", as:"place_id", onDelete:"cascade", onUpdate:"no action"})
    report.belongsTo(user, {foreignKey:"report_by_user", as:"user_inserted_report", onDelete:"no action", onUpdate:"no action"})
    report.belongsTo(place, {foreignKey:"report_place_id", as:"report_on_place", onDelete:"cascade", onUpdate:"cascade"})
   // user.hasMany(host, {foreignKey:"user_id"})
    //user.hasMany(place,{foreignKey:"place_info_by"})
   
    };

    module.exports = { applyExtraSetup };

    