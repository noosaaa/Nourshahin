const jwt = require('jsonwebtoken');
const config=require('config');
module.exports= (req,res,nxt)=>{
    //get x-auth
    const token = req.header("x-auth-token");
    if(!token) return res.status(401).send("Access Denied");
    
    try{    const decodePayload=jwt.verify(token,config.get("jwtsec"));
         //check user
        if(!decodePayload.adminRole) return res.status(401).send("Access denied"); 
        nxt();
    }   
    catch(err){
        res.status(400).send("Invalid Token");
    }    

}