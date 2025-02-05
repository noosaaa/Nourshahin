const mongoose = require('mongoose');

const atmSchema = new mongoose.Schema({
  bankId: { type: String, required: true }, // معرف البنك كرقم
  name: { type: String, required: true }, // اسم ماكينة الصراف
  rating: { type: Number, default: 0 }, // التقييم
  address: { type: String, required: true }, // العنوان
  location: { // الإحداثيات كـ lat و lng
    lat: { type: Number, required: true }, // خط العرض
    lng: { type: Number, required: true }, // خط الطول
  },
});

// لا حاجة لإعداد فهرس 2dsphere عند استخدام lat و lng مباشرة
module.exports = mongoose.model('Atm', atmSchema);
