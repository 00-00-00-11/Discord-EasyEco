const mongoose = require('mongoose')

const economy = new mongoose.Schema({
  uid: { type: Number, required: true },
  balance: { type: Number, required: false, default: 0 },
  bank: { type: Number, required: false, default: 0 },
  daily: { type: String, required: false, default: false },
  work: { type: String, required: false, default: false },
  rob: { type: String, required: false, default: false }
})
module.exports = mongoose.model('economy', economy)