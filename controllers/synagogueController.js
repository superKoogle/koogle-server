const db = require('../model/index')
const Synagogue = db.synagogue;
const { Op } = require("sequelize");

const getAllSynagoguesByID = async(ids) => {
    const synagogues = await Synagogue.findAll({ where: { synagogue_id: { [Op.in]: ids } } });
    return synagogues;
}



const getOneSynagogue = async (id) => {
    const synagogue = await Synagogue.findOne({where:{synagogue_id:id}})
    return synagogue;
}

const addSynagogue = async (id, newSynagogue) => {
    const { syn_nusach } = newSynagogue;
    if (!id) return null;
    const synagogue = await Synagogue.create({ synagogue_id:id, syn_nusach})
    return synagogue;
}

const deleteSynagogue = async (id)=>{

    if(!id) return;
    await Synagogue.destroy({
        where:{
            synagogue_id: id
        }
    });
}

const updateSynagogue = async (synagogue) => {
    const  {synagogue_id, syn_nusach} = synagogue;

    // Confirm data
    if (!synagogue_id) return null;
    const updatedSynagogue = await Synagogue.update({syn_nusach},{where:{synagogue_id:synagogue_id}})

    return  updatedSynagogue;
}

module.exports = {
    getAllSynagoguesByID,
    getOneSynagogue,
    addSynagogue,
    deleteSynagogue,
    updateSynagogue
};