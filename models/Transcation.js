const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: String,
  transactionId:String,
  type: String,
  amount: Number,
  category: String,
  date: Date
});

module.exports = mongoose.model('Transaction', transactionSchema);
