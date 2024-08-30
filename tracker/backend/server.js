const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();
require('./Models/userModel');
const PORT = process.env.PORT || 5000;
const AuthRouter=require('./Routes/AuthRouter');
const mongo_uri=process.env.MONGO_URI;

// Middleware

app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies from HTTP requests
app.use('/auth',AuthRouter);
app.get('/ping',(req,res)=>{
  res.send("PONG");
});

// Connect to MongoDB

const db2Connection=mongoose.createConnection(mongo_uri, {
  
});
db2Connection.on('connected',()=>{
  console.log('Connected to the second database');
});

db2Connection.on('error',(err)=>{
  console.error('Error connecting to the second database:',err);
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
if(typeof AuthRouter==='function'){
  app.use('/api/auth',AuthRouter);
}else{
  console.error('Authorization is not a valid middleware function.Check its import and export');
}


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log server startup message
});
