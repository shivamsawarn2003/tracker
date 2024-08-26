import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
  const [transactionDate, setTransactionDate] = useState(""); // State to store the transaction date
  const [description, setDescription] = useState(""); // State to store the transaction description
  const [amount, setAmount] = useState(""); // State to store the transaction amount
  const [transactions, setTransactions] = useState([]); // State to store the list of transactions

  // Function to fetch transactions from the backend when the component loads
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/transactions');
        setTransactions(response.data); // Set the fetched transactions to the state
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };
    fetchTransactions();
  }, []);

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!description || !amount || !transactionDate) {
      alert("Please fill in all the required fields");
      return;
    }

    // Create a new transaction object
    const newTransaction = {
      description,
      amount,
      transactionDate,
    };

    try {
      // Send the POST request to the backend to save the transaction
      await axios.post('http://localhost:5000/transactions', newTransaction);

      // Add the new transaction to the transaction state array
      setTransactions([...transactions, newTransaction]);

      // Clear the form fields after submission
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

      {/* Section to display the list of transactions */}
      <div className="transactions">
        {transactions.map((transaction, index) => (
          <div className="transaction" key={index}>
            {/* Unique key for each transaction */}
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
}

export default App;
