// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Login from './Login'; // Assume you have a Login component
import AuthContext, { AuthProvider } from './AuthContext';

const ExpenseTracker = () => {
  const [transactionDate, setTransactionDate] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/transactions', {
          headers: { Authorization: `Bearer ${authToken}` }, // Pass the token in headers
        });
        setTransactions(response.data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };
    fetchTransactions();
  }, [authToken]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!description || !amount || !transactionDate) {
      alert("Please fill in all the required fields");
      return;
    }

    const newTransaction = {
      description,
      amount,
      transactionDate,
    };

    try {
      await axios.post('http://localhost:5000/transactions', newTransaction, {
        headers: { Authorization: `Bearer ${authToken}` }, // Pass the token in headers
      });

      setTransactions([...transactions, newTransaction]);

      setDescription("");
      setAmount("");
      setTransactionDate("");
    } catch (err) {
      console.error("Error saving the transaction:", err);
    }
  };

  return (
    <div className="App">
      <h1>Expense Tracker</h1>

      <form onSubmit={handleFormSubmit}>
        <div className="basic">
          <input
            type="text"
            placeholder={'$200 new watch'}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="description">
          <input
            type="text"
            placeholder={'Description'}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="date-picker">
          <label htmlFor="transaction-date">Transaction Date:</label>
          <input
            type="datetime-local"
            id="transaction-date"
            value={transactionDate}
            onChange={(e) => setTransactionDate(e.target.value)}
          />
        </div>
        <button type="submit">Add new transaction</button>
      </form>

      <div className="transactions">
        {transactions.map((transaction, index) => (
          <div className="transaction" key={index}>
            <div className="left">
              <div className="name">{transaction.description}</div>
              <div className="datetime">{transaction.transactionDate}</div>
            </div>
            <div className="right">
              <div className="price">${transaction.amount}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authToken } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        authToken ? <Component {...props} /> : <Navigate to="/login" />
      }
    />
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/tracker" component={ExpenseTracker} />
          <Navigate from="/" to="/login" />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
