const mongoose = require('mongoose');
//hello
// Define the schema for transactions
const transactionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  transactionDate: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

// Create and export the Transaction model
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
