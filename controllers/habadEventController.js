const db = require('../model/index')
const Habad_Events = db.habadEvent;
const { Op } = require("sequelize");

const getAllEvents = async(req,res)=>{
    const events = await Habad_Events.findAll({})
    if(!events?.length){
        return res.status(400).json({message: 'No events found'})
    }
    res.json(events)
}

const addNewEvent = async(req,res)=> {
    const {habad_id,event_desc,event_date,event_with_food} = req.body;
    if(!habad_id){
        return res.status(400).json({message: 'habad_id field is required'})
    }
    const event = await Habad_Events.create({habad_id,event_desc,event_date,event_with_food})

    if(event){
        return res.status(201).json({message: 'New event created'})
    } else {
        return res.status(400).json({message:'Invalid event data received'})
    }
}

const deleteEvent= async(req,res)=>{
    const {event_id} = req.body
    if(!event_id){
        return res.status(400).json({message: 'event ID required'})
    }
    const eventToDel = await Habad_Events.findOne({where:{event_id:event_id}})
    if(!eventToDel){return res.status(400).json({message:'event does not exist'})}
    await Habad_Events.destroy({
        where:{
            event_id: event_id
        }
    });
    res.json(`event with ID ${event_id} deleted`)
}

const getEventsByHabadId = async(req,res)=>{
    const {habad_id} = req.body
    if(!habad_id){return res.status(400).json({message: 'habad_id required'})}
    const events = await Habad_Events.findAll({where:{habad_id:habad_id}})
    res.json(events)
}

const updateEventByEventId = async(req,res)=>{
    const {event_id,habad_id,event_desc,event_date,event_with_food} = req.body;
    if (!event_id) {return res.status(400).json({message: 'event_id required'})};
    const updatedEvent = await Habad_Events.update({habad_id,event_desc,event_date,event_with_food},{where:{event_id:event_id}})
    res.json(updatedEvent)
}

module.exports = {
    getAllEvents,
    addNewEvent,
    deleteEvent,
    getEventsByHabadId,
    updateEventByEventId,
};