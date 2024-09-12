import React, { useState, useEffect } from 'react';

const Modal = ({
  isOpen,
  onClose,
  onSubmit,
  newTransaction,
  setNewTransaction,
}) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Add Transaction</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <input
              type="text"
              placeholder="Category"
              value={newTransaction.category}
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  category: e.target.value,
                })
              }
              className="p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="date"
              value={newTransaction.date}
              onChange={(e) =>
                setNewTransaction({ ...newTransaction, date: e.target.value })
              }
              className="p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="number"
              placeholder="Amount"
              value={newTransaction.amount}
              onChange={(e) =>
                setNewTransaction({
                  ...newTransaction,
                  amount: parseFloat(e.target.value),
                })
              }
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="p-2 bg-gray-300 text-gray-700 rounded mr-2">
              Cancel
            </button>
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded">
              Add Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Transactions = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      category: 'Restaurants & Cafe',
      date: '20 August 2019',
      amount: -99.0,
    },
    {
      id: 2,
      category: 'Clothes & Shopping',
      date: '25 September 2019',
      amount: -2357,
    },
    {
      id: 3,
      category: 'Credit & Loans',
      date: '10 April 2019',
      amount: -4867,
    },
    {
      id: 4,
      category: 'Gifts Card',
      date: '10 October 2019',
      amount: -85.0,
    },
  ]);

  const [totalValue, setTotalValue] = useState(0);
  const [numberOfTransactions, setNumberOfTransactions] = useState(0);
  const [newTransaction, setNewTransaction] = useState({
    category: '',
    date: '',
    amount: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const calculateTotalValue = () => {
    let sum = 0;
    transactions.forEach((transaction) => {
      sum += transaction.amount;
    });
    setTotalValue(sum);
  };

  const calculateNumberOfTransactions = () => {
    setNumberOfTransactions(transactions.length);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
    calculateTotalValue();
    calculateNumberOfTransactions();
  };

  const handleAddTransaction = () => {
    const newId = transactions.length
      ? Math.max(transactions.map((t) => t.id)) + 1
      : 1;
    setTransactions([...transactions, { id: newId, ...newTransaction }]);
    setNewTransaction({ category: '', date: '', amount: 0 });
    setIsModalOpen(false);
  };

  useEffect(() => {
    calculateTotalValue();
    calculateNumberOfTransactions();
  }, [transactions]);

  return (
    <div className="container mx-auto p-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-custom24 font-bold">January 15 2020</h1>
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={() => setIsModalOpen(true)}>
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add Wallet
        </button>
      </div>

      <div className="flex justify-between mb-4 items-center">
        <p className="text-gray-500 text-custom16">
          Number of transactions: {numberOfTransactions}
        </p>
        <div className="flex items-center ml-auto">
          <p className="text-gray-500 text-custom16 ml-4">
            Value: ${totalValue.toFixed(2)}
          </p>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTransaction}
        newTransaction={newTransaction}
        setNewTransaction={setNewTransaction}
      />
      <div className="grid grid-cols-1 gap-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-gray-100 shadow-md rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {/* Icon SVGs based on category */}
                {transaction.category === 'Restaurants & Cafe' && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 20l4-16m2 16l4-16m-6 16H7m6-6v6m4-6v6m-4-6h.01M9 16h.01"
                    />
                  </svg>
                )}
                {transaction.category === 'Clothes & Shopping' && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-purple-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                )}
                {transaction.category === 'Credit & Loans' && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-yellow-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                )}
                {transaction.category === 'Gifts Card' && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                )}
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-medium">{transaction.category}</h2>
                <p className="text-gray-500">{transaction.date}</p>
              </div>
            </div>
            <div className="flex justify-end mt-2">
              <p className="text-gray-600 font-medium">${transaction.amount}</p>
              <button
                onClick={() => handleDeleteTransaction(transaction.id)}
                className="ml-4 p-2 rounded-md bg-gray-200 text-gray-600 justify-end">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
