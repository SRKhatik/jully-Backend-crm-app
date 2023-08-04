const bcrypt = require("bcrypt");
const userModel = require("../Models/userModel")
const {userStatus,userType} =require("../utils/constants")
const register = (req,res)=>{
   
    const {name,userId, email, password, userType} = req.body
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user ={
        name,
        userId,
        email,
        password:hashedPassword,
        userType,
        userStatus:(userType === userType.customer)? userStatus.approved:userStatus.pending
    }
    const newUser = new userModel(user);

    newUser.save().then(data=>{
        console.log(data);
    res.status(201).send({message:"User Created Successfully!"})
    })
    .catch(err=>{
        if(err.code===11000){
            return res.status(400).send({message:"UserId/Email already exists in the database "})
        }
        return res.status(500).send({message:err.message})
    })
}

module.exports ={
    register
}