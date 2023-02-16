const db = require('../model/index')
const Habad = db.habad

const { Op } = require("sequelize");

const getAllHabadsByID = async(ids) => {
    const habads = await Habad.findAll({ where: { habad_id: { [Op.in]: ids } } });
    return habads;
}

const getOneHabad = async (id) => {
    const habad = await Habad.findOne({where:{habad_id:id}})
    return habad;
}

const addHabad = async (id, newHabad) => {
    const { habad_intermediary, habad_phone, habad_site_link } = newHabad;
    if (!id) return null;
    const habad = await Habad.create({ habad_id:id, habad_intermediary, habad_phone, habad_site_link })

    if (habad) {
        return habad
    } else {
        return null
    }
}

const deleteHabad = async (id)=>{

    if(!id) return;
    await Habad.destroy({
        where:{
            habad_id: id
        }
    });
}

const updateHabad = async (habad) => {
    const  {habad_id, habad_intermediary, habad_phone, habad_site_link } = habad;

    // Confirm data
    if (!habad_id) return null;
    const updatedHabad = await Habad.update({habad_intermediary, habad_phone, habad_site_link},{where:{habad_id:habad_id}})

    if (!updatedHabad) {
        return null;
    }
    return  updatedHabad;
}

module.exports = {
    getAllHabadsByID,
    getOneHabad,
    addHabad,
    deleteHabad,
    updateHabad
};