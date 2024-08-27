const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5000;
const authRoutes=require('./authRoutes');
// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies from HTTP requests

// Connect to MongoDB
mongoose.connect('mongodb+srv://shivakvs2003:SOKWJZ3Blq5IlYeV@cluster0.gtatz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  // Removed deprecated options
});

// Define the schema for transactions
const transactionSchema = new mongoose.Schema({
  description: String,
  amount: String,
  transactionDate: String,
});

// Create a model based on the schema
const Transaction = mongoose.model('Transaction', transactionSchema);

// Route to get all transactions
app.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find(); // Fetch all transactions from the database
    res.json(transactions); // Send transactions as JSON response
  } catch (err) {
    res.status(500).json({ message: err.message }); // Send error message if something goes wrong
  }
});

// Route to add a new transaction
app.post('/transactions', async (req, res) => {
  // Create a new transaction object using the Transaction model
  const newTransaction = new Transaction({
    description: req.body.description,
    amount: req.body.amount,
    transactionDate: req.body.transactionDate,
  });

  try {
    const savedTransaction = await newTransaction.save(); // Save the new transaction to the database
    res.status(201).json(savedTransaction); // Send the saved transaction as JSON response
  } catch (err) {
    res.status(400).json({ message: err.message }); // Send error message if something goes wrong
  }
});

//Routes
app.use('/api/auth',authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log server startup message
});
