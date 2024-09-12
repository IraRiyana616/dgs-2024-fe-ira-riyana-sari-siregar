import React, { useState, useEffect } from 'react';
import Modal from '/src/components/transaction/Modal';
import TransactionCard from '/src/components/transaction/TransactionCard';

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
    setTransactions((prevTransactions) =>
      prevTransactions.filter((transaction) => transaction.id !== id)
    );
  };

  const handleAddTransaction = () => {
    setTransactions((prevTransactions) => [
      ...prevTransactions,
      { ...newTransaction, id: Date.now() },
    ]);
    setNewTransaction({ category: '', date: '', amount: 0 });
    setIsModalOpen(false);
  };

  useEffect(() => {
    calculateTotalValue();
    calculateNumberOfTransactions();
  }, [transactions]);

  return (
    <div className="p-6">
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

      <div className="mt-4 grid grid-cols-1 gap-4">
        {transactions.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            transaction={transaction}
            onDelete={handleDeleteTransaction}
          />
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTransaction}
        newTransaction={newTransaction}
        setNewTransaction={setNewTransaction}
      />
    </div>
  );
};

export default Transactions;
