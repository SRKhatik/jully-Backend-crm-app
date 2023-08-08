//check whether the user is authenticated or not 

const verifyToken= async (req,res,next)=>{
    //check wheather the token is passed or not 
    const token = req.headers('x-access-token');

    if(!token){
        return res.status(403).send({message:"no token provided"})
    }
    try {
        var payload=jwt.verify(token,process.env.SECRET);
        const user =await userModel.findOne({userId:payload.id})
        req.userid = user;
        next();
    }catch(err){
        //err
        return res.status(403).send({message:"Invalid jwt passed "})
    }
    
}
const isAdmin =(req,res,next)=>{
if(req.user.userType !== userTypes.admin){
    return res.status(403).send({message:"Only Admin are allowd to access this route "})
}
}
module.exports={
    verifyToken,
    isAdmin
}