const express = require('express');
const { getTransactions, addTransaction } = require('../Controllers/TransactionController'); // Ensure the path is correct
const authMiddleware = require('../Middlewares/authMiddleware'); // Correct import without destructuring
const router = express.Router();

// Transaction routes
router.get('/', authMiddleware, getTransactions);
router.post('/', authMiddleware, addTransaction);

module.exports = router;
