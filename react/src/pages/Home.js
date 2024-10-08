import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import AuthContext  from '../AuthContext'; // Ensure this path is correct
import {  handleSuccess } from '../utils';
import '../App.css'; // Assuming you need styles from App.css

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [transactionDate, setTransactionDate] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const { authToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const {theme,toggleTheme}=useContext(ThemeContext);

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('https://tracker-5.onrender.com/transactions', {
          headers: { Authorization: `Bearer ${authToken}` },
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
      await axios.post('https://tracker-5.onrender.com/transactions', newTransaction, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      setTransactions([...transactions, newTransaction]);

      setDescription("");
      setAmount("");
      setTransactionDate("");
    } catch (err) {
      console.error("Error saving the transaction:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="App">
      <div className="toggle-button">
        <div className={`toggle-switch ${theme === 'dark' ? 'dark' : ''}`}
          onClick={toggleTheme}
        >
          <div className="toggle-thumb"></div>
        </div>
      </div>

      <p>Current Theme: {theme === 'light' ? 'Light Mode' : 'Dark Mode'}</p>
      <h1>Welcome {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>

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
      <ToastContainer />
    </div>
  );
}

export default Home;
