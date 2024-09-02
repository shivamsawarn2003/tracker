const Transaction = require('../Models/Transaction'); // Ensure this path is correct

// Function to get all transactions for a specific user
const getTransactions = async (req, res) => {
  try {
    // Fetch transactions that belong to the logged-in user
    const transactions = await Transaction.find({ userId: req.user._id });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Function to add a new transaction for the logged-in user
const addTransaction = async (req, res) => {
  const newTransaction = new Transaction({
    description: req.body.description,
    amount: req.body.amount,
    transactionDate: req.body.transactionDate,
    userId: req.user._id, // Ensure user ID is associated with the transaction
  });

  try {
    // Save the new transaction to the database
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getTransactions,
  addTransaction,
};
