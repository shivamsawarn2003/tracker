const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();
require('./Models/userModel'); // Ensure this file is correct and exporting UserModel
const PORT = process.env.PORT || 5000;
const AuthRouter = require('./Routes/AuthRouter');
const mongo_uri = process.env.MONGO_URI;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies from HTTP requests
app.use('/auth', AuthRouter);
app.get('/ping', (req, res) => {
  res.send("PONG");
});

// Connect to MongoDB
mongoose.connect(mongo_uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit process with failure
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log server startup message
});
