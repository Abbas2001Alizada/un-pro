import { DataTypes } from 'sequelize';
import sequelize from '../dbconnection.js';



const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    
       profile_picture:{
type: DataTypes.STRING,},

profile_picture_path:{
    type: DataTypes.STRING,
    

       } 
    
    
},{
    timestamps:true
})

export default User;