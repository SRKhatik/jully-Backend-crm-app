const mongoose = require("mongoose")

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
        maxLength:5
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
        enum:["CUSTOMER","ENGINEER","ADMIN"],
        default:"CUSTOMER"
    },
    userStatus:{
        type:String,
        required:true,
        enum:[ "PENDING","APPROVED","REJECTED"],
        default:"PENDING"
    }
},{timestamps:true})
 
module.exports = mongoose.model("User",userSchema);