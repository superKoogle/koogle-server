const db = require('../model/index')
const Supermarket = db.supermarket;
const { Op } = require("sequelize");

const getAllSupermarketsByID = async(ids) => {
    const supermarkets = await Supermarket.findAll({ where: { supermarket_id: { [Op.in]: ids } } });
    return supermarkets;
}

const getOneSupermarket = async (id) => {
    const supermarket = await Supermarket.findOne({where:{supermarket_id:id}})
    return supermarket;
}

const addSupermarket = async (id, newSupermarket) => {
    const {market_phone, market_site_link } = newSupermarket;
    if (!id) return null;
    const supermarket = await Supermarket.create({ supermarket_id:id, market_phone, market_site_link })

    return supermarket;
}

const deleteSupermarket = async (id)=>{

    if(!id) return;
    await Supermarket.destroy({
        where:{
            supermarket_id: id
        }
    });
}

const updateSupermarket = async (supermarket) => {
    const  {supermarket_id, market_phone, market_site_link } = supermarket;

    // Confirm data
    if (!supermarket_id) return null;
    const updatedSupermarket = await Supermarket.update({market_phone, market_site_link},{where:{supermarket_id:supermarket_id}})
    return  updatedSupermarket;
}

module.exports = {
    getAllSupermarketsByID,
    getOneSupermarket,
    addSupermarket,
    deleteSupermarket,
    updateSupermarket
};