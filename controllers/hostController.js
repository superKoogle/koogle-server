const db = require('../model/index')
const {Op} = require('sequelize')
const transporter = require('../email')
const Host = db.hosts
const User = db.users

const addNewHost = async(req,res)=>{
    const user_id = req.user.user_id;
    const {host_start_date, host_end_date,host_always,host_max_guests,host_min_age,host_type} = req.body
    if(!host_type) return res.status(400).json({message:'All Fields are required'});
    const host = await Host.create({host_start_date, host_end_date,host_always,host_max_guests,host_min_age,host_type,user_id})
    if(!host){
        return res.status(400).json({message:'Invalid host data received'})
    }
    const relevantHosts = await Host.findAll({
        where:{
            host_type:host_type=='HOST'?'GUEST':'HOST',
            //host_start_date:{[Op.lte]:host_start_date},
            //host_end_date:{[Op.gte]:host_end_date},//Beayah!!
            host_max_guests:{[Op.gte]:host_max_guests},
            host_min_age:{[Op.lte]:host_min_age},
            user_id:{[Op.not]:user_id}
            //לבדוק סינון לפי מרחק
        },
        attributes:['host_start_date', 'host_end_date','host_always','host_max_guests','host_min_age','host_type'],
        include    : [
            { model: User, as: 'user', attributes:['user_fname','user_lname', 'user_email', 'user_location_lat', 'user_location_lng'], incl}
        ]
    })
    
    const user = await User.findOne({where:{user_id:user_id}});
    sendMailToRelevantHost(relevantHosts, user);
    return res.status(201).json({message: 'New host created'})
}

const sendMailToRelevantHost = (relevantHosts, user)=>{
    relevantHosts.forEach(host => {
        console.log(host.dataValues.user.user_email, user.dataValues.user_email)
        var mailOptions = {
            from: '36213936065@mby.co.il',
            to: host.dataValues.user.user_email,
            subject: host.dataValues.user.user_fname +', We have found a relevant guest for you',
            text: 'for more details be in touch with '+user.dataValues.user_email,
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
    });
}

const getHostById = async(req,res)=>{
    const {host_id} = req.body;
    if(!host_id){return res.status(400).json({message: 'Host ID required'})}
    const host = await Host.findOne({where:{host_id:host_id}})
    if(!host){return res.status(400).json({message: 'Host not found'})}
    res.json(host)
}

const getHostsByUserId = async(req,res)=>{
    const {user_id} = req.body;
    if(!user_id){return res.status(400).json({message: 'Host ID required'})}
    const hosts = await Host.findAll({where:{user_id:user_id}})
    if (!hosts?.length) {
        return res.status(400).json({ message: 'No hosts found' })
    }
    res.json(hosts)
}

const deleteHost = async(req,res)=>{
    const {host_id} = req.body
    if(!host_id){
        return res.status(400).json({message: 'Host ID required'})
    }
    await Host.destroy({
        where:{host_id: host_id}
    });
    res.json(`Host with ID ${host_id} deleted`)
}


module.exports = {
    addNewHost,
    getHostById,
    deleteHost,
    getHostsByUserId,
}