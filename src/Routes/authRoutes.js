

module.exports = function(app){
    app.post ("/crm/api/v1/users",(req,res)=>{
        const {name,userId, email, password, userType} = req.body
    
        const hashedPassword = bcrypt.hashSync(password, 10);
    
        const user ={
            name,
            userId,
            email,
            password:hashedPassword,
            userType,
            userStatus:(userType==="CUSTOMER")?"APPROVED":"PENDING"
        }
        const newUser = new userModal(user);
    
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
    })
  
}