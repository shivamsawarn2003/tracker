const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();
require('./Models/userModel'); // Ensure this file is correct and exporting UserModel
const PORT = process.env.PORT || 5000;
const AuthRouter = require('./Routes/AuthRouter');
const TransactionRouter = require('./Routes/TransactionRouter');
const mongo_uri = process.env.MONGO_URI;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON bodies from HTTP requests

// Routes
app.use('/auth', AuthRouter);
app.use('/transactions', TransactionRouter);
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log server startup message
});
