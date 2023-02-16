const db = require('../model/index')
const Report = db.reports


const  getAllReports = async(req, res)=>{
    const reports = await Report.findAll({})
    if(!reports?.length){
        return res.status(400).json({message: 'No reports found'})
    }
    res.json(reports)
}

const createNewReport = async(req, res)=>{
    const {report_place_id, report_text} = req.body
    const report_by_user = req.user.user_id
    if(!report_place_id){
        return res.status(400).json({message: 'All fields are required'})
    }
    const report = await Report.create({report_by_user, report_place_id, report_text})

    if(report){
        return res.status(201).json({message: 'New report created'})
    } else {
        return res.status(400).json({message:'Invalid report data received'})
    }
}

const deleteReport = async (req, res)=>{
    const {id} = req.body

    if(!id){
        return res.status(400).json({message: 'Report ID required'})
    }
    await Report.destroy({
        where:{
            report_id: id
        }
    });
    res.json(`Note with ID ${id} deleted`)
}

module.exports = {
    getAllReports,
    createNewReport,
    deleteReport
}