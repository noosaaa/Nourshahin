const express = require('express');
const router = express.Router();
const validator = require("../expressdemo/middlewares/UserMWValidator"); 
const User = require("../models/UserModel"); //refer to model as it is if {USER} or USER
const bcrypt = require("bcrypt");
const config = require("config");
// Registration
// router.post("/", validator, async (req, res) => {
//     console.log(req.body);  // طباعة البيانات المرسلة في الجسم
//     try {
//         let user = await User.findOne({ email: req.body.email }).exec();
//         if (user) {
//             return res.status(400).send("Already registered");
//         }

//         let salt = await bcrypt.genSalt(10);
//         let hashedPswd = await bcrypt.hash(req.body.password, salt);

//         user = new User({
//             email: req.body.email,
//             name: req.body.name,
//             password: hashedPswd
//         });

//         await user.save();
//         res.status(200).send({ name: user.name, email: user.email });
//     } catch (err) {
//         console.error(err.message);
//         res.status(400).send("Bad Request");
//     }
// });



router.post("/", validator, async (req, res) => {
    // Check if user already exists
    try {
        let user = await User.findOne({ email: req.body.email }).exec();
        if (user) {
            return res.status(400).json({ message: "User already registered" });
        }

        // Create new user to be added to the database
        let salt = await bcrypt.genSalt(10);
        let hashedPswd = await bcrypt.hash(req.body.password, salt);

        // Create new user object
        user = new User({
            email: req.body.email,
            name: req.body.name,
            password: hashedPswd  // Use hashedPswd instead of req.body.hasheedPswd
        });

        // Save user to database
        await user.save();
        if(!config.get("jwtsec")) return res.status(500).send("Request cannot be fulfilled..token is not defined");
        const token = user.genAuthToken();
        //send response
        res.header("x-auth-token",token)
        // Send success response
        res.status(201).json({ message: "User registered successfully" });

    } catch (err) {
        console.error(err.message);

        // If there are validation errors or other issues, return a more specific error message
        res.status(500).json({ message: "Server error", error: err.message });
    }
});
router.get("/", async (req, res) => {
    try {
        const users = await User.find().select("-password"); // جلب جميع المستخدمين بدون عرض كلمات المرور
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
});

module.exports = router;
