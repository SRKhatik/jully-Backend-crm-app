const mongoose = require("mongoose")
const validator = require("validator");
const { userType, userStatus } = require("../utils/constants");

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        
    },
    userId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        minLength:3,
        maxLength:10
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        validate:{
            validator:validator.isEmail
        }
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        required:true,
        enum:Object.values(userType),
        default:userType.customer
    },
    userStatus:{
        type:String,
        required:true,
        enum:Object.values(userStatus),
        default:userStatus.pending 
    }
},{timestamps:true})
 
module.exports = mongoose.model("User",userSchema);