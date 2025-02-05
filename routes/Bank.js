// routes/bankRoutes.js
const express = require('express');
const router = express.Router();
const Bank = require('../models/BankModel');

// API للحصول على قائمة البنوك
router.get('/', async (req, res) => {
    try {
        // تصحيح الخطأ في دالة select
        const banks = await Bank.find()
            .select('name logoUrl');  // تحديد الحقول التي سيتم استرجاعها
        res.json(banks);  // إرجاع البنوك كـ JSON
    } catch (error) {
        res.status(500).json({ message: 'Error fetching banks', error });
    }
});

module.exports = router;
