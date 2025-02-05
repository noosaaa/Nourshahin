// models/Bank.js
const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
    bankId: { type: String, required: true },
    name: { type: String, required: true },
    logoUrl: { type: String, required: true },

});

const Bank = mongoose.model('Bank', bankSchema);

module.exports = Bank;
