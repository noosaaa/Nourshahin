const express = require('express');
const Atm = require('../models/AtmModel'); // استيراد موديل الماكينة
const router = express.Router();
const mongoose = require('mongoose');

// API لجلب ماكينة ATM باستخدام bankId
router.get('/searchByBankId', async (req, res) => {
  const { bankId } = req.query;  // جلب الـ bankId من الـ Query Parameter

  // التحقق من صحة الـ bankId
  if (!bankId) {
    return res.status(400).json({ message: 'Missing bankId' });
  }

  try {
    // البحث عن ماكينة ATM باستخدام الـ bankId كـ String
    let atms = await Atm.find({ bankId: bankId });

    // إذا تم العثور على ماكينات ATM، يتم إرجاعها
    if (atms && atms.length> 0 )  {
      return res.status(200).json(atms);
    } else {
      // إذا لم يتم العثور على ماكينات، يتم إرجاع رسالة
      return res.status(404).json({ message: `No ATMs found for bankId ${bankId}` });
    }
  } catch (error) {
    console.error('Error fetching ATMs:', error);
    res.status(500).json({ message: 'Error fetching ATMs', error: error.message });
  }
});

module.exports = router;