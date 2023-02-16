const db = require('../model/index')
const Restaurant = db.restaurant
const { Op } = require("sequelize");

const getAllRestaurantsByID = async (IdArr) => {
    const Restaurants = await Restaurant.findAll({
        where: {
            restaurant_id: {
                [Op.in]: IdArr
            }
        }
    })
    return Restaurants;
}

const addRestaurant = async (id, newRestaurant) => {
    const { res_phone_number, res_type, res_hechsher, res_site_link, res_stars } = newRestaurant;
    if (!id || !res_hechsher) return null;
    const restaurant = await Restaurant.create({ restaurant_id: id, res_phone_number, res_type, res_hechsher, res_site_link, res_stars });
    if (restaurant) {
        return restaurant;
    }
    else {
        return null
    }
}

const deleteRestaurant = async (id) => {
    if (!id) return;
    await Restaurant.destroy({
        where: {
            restaurant_id: id
        }
    });
}

const updateRestaurant = async (restaurant) => {
    const { restaurant_id, res_phone_number, res_type, res_hechsher, res_site_link, res_stars } = restaurant;
    if (!restaurant_id) return null;
    const updatedRestaurant = await Restaurant.update({ restaurant_id, res_phone_number, res_type, res_hechsher, res_site_link, res_stars }, { where: { restaurant_id: restaurant_id } })
    if (!updatedRestaurant) return null;
    return updatedRestaurant;

}

const getOneRestaurant = async (id) => {
    if (!id) return;
    const restaurant = await Restaurant.findOne({
        where: { restaurant_id: id }
    })
    return restaurant;
}

module.exports = {
    getAllRestaurantsByID,
    addRestaurant,
    deleteRestaurant,
    updateRestaurant,
    getOneRestaurant
}




