const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const auth = require('../middlewares/AuthMWPermission');

// Update User to Admin
router.put("/:id", auth, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id, 
            { isAdmin: true }, 
            { new: true } // Return the updated document
        );

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.status(200).send("User Role is set to Admin");
    } catch (err) {
        console.error(err);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
