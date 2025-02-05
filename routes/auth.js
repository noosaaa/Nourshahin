const express = require('express');
const router = express.Router();
const validator = require('../expressdemo/middlewares/AuthMWValidator');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const config = require ("config");
router.post("/",validator,async (req, res) =>{
    //check email
    try{
        console.log(config.get("jwtsec")); //for sure
        let user = await User.findOne({email:req.body.email}).exec();
    if(!user) return res.status(400).send("Invalid email or password");
    //check password
    const validPserd= await bcrypt.compare(req.body.password,user.password)
    if (!validPserd) return res.status(400).send("Invalid email or password");
    
    if(!config.get("jwtsec")) return res.status(500).send("Request cannot be fulfilled..token is not defined");
    const token = user.genAuthToken();
    //send response
    res.header("x-auth-token",token)
    res.status(200).send("logged in successfully");}
    catch(ex){
        console.error(ex);
        res.status(500).send("Server Error");
    }
})

module.exports = router;