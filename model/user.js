
const {sequelize, DataTypes} = require('./sequelize');
const User = sequelize.define(
        "user",
        {
            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_fname: {
                type: DataTypes.STRING(20),
            },
            user_lname: {
                type: DataTypes.STRING(20),
            },
            user_name:{
                type:DataTypes.STRING(20),
                allowNull:false,
                //unique:true
            },
            user_email:{
                type: DataTypes.STRING(45),
            },
            user_password:{
                type: DataTypes.STRING,
            },
            user_birth_date:{
                type: DataTypes.DATEONLY,
            },
            user_location_lat:{
                type: DataTypes.FLOAT,
            },
            user_location_lng:{
                type: DataTypes.FLOAT,
            },
            user_is_host:{
                type: DataTypes.TINYINT,
            },
            user_permission:{
                allowNull:false,
                type:DataTypes.ENUM('BLOCKED','USER','ADMIN'),
                defaultValue:'USER'
            },
            user_active:{
                type:DataTypes.BOOLEAN,
                defaultValue:true
                },  
        },
        {
            timestamps: false,
        }
    );
module.exports = User;