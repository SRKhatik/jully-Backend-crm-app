module.exports = function(app){
    app.get("/crm/api/v1/users",async(req,res)=>{
        try{
            const users = await userModal.find({});
            return res.send(users)
        }
        catch(err){
            return res.status(500).send({message:err.message})
        }
    })
}
