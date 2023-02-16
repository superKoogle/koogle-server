const db = require('../model/index')
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')
const User = db.users;
const { Op } = require("sequelize");

const SignIn = async (req, res) => {
    const { user_name, user_password } = req.body
    if (!user_name || !user_password) { return res.status(400).json({ message: 'All fields are required' }) }
    const foundUser = await User.findOne({ where: { user_name: user_name } });
    if (!foundUser || !foundUser.user_active) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const match = await bcrypt.compare(user_password, foundUser.user_password);
    if (!match) return res.status(401).json({ message: 'Unauthorized' })
    const userInfo = {user_id:foundUser.user_id,user_name:foundUser.user_name,user_permission:foundUser.user_permission,user_fname:foundUser.user_fname,user_lname:foundUser.user_lname}
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken:accessToken})
}

const SignUp = async (req, res) => {
    const { user_name, user_fname, user_lname, user_email, user_password } = req.body;
    if (!user_fname || !user_lname || !user_password || !user_name) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const duplicate = await User.findOne({ where: { user_name: user_name } })

    if (duplicate) {
        return res.status(409).json({ message: "Duplicate username" })
    }
    const hashedPwd = await bcrypt.hash(user_password, 10)
    const userObject = { user_fname, user_lname, user_email, user_name, user_password: hashedPwd }
    const user = await User.create(userObject)
    if (user) { 
        return res.status(201).json({
            message: `New user ${user.user_name} created`
        })
    } else {
        return res.status(400).json({ message: 'Invalid user data received' })
    }
}

const updateUserById = async (req, res) => {
 const {user_id} = req.user;
 const {user_location_lat, user_location_lng, user_is_host} = req.body;
    if (!user_location_lat ||  !user_location_lng || !user_is_host) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const user = User.update({user_location_lat, user_location_lng, user_is_host}, {where:{user_id:user_id}});

    if (!user) {
        return res.status(400).json({ message: 'user not found' })
    }
    res.json(user)
}

const changeUserPermission = async (req, res)=>{
    const {user_permission} = req.user;
    if(user_permission!='ADMIN'){return res.json({message: 'Unauthorized'})}
    const {user_id, permission} = req.body;
    if (!user_id ||  !permission) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const user = User.update({user_permission:permission}, {where:{user_id:user_id}});
    if (!user) {
        return res.status(400).json({ message: 'user not found' })
    }
    res.json(user)
}

module.exports = {
    SignIn,
    SignUp,
    updateUserById, 
    changeUserPermission
};



