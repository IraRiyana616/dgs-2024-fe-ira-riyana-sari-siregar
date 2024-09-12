import React, { useState, useEffect } from 'react';

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
      date: '25 September 201',
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

  const handleBookmarkTransaction = (id) => {
    // Implement bookmark functionality here
  };

  useEffect(() => {
    calculateTotalValue();
    calculateNumberOfTransactions();
  }, []);

  return (
    <div className="container mx-auto  p-10">
      <h1 className="text-custom24 font-bold mb-4">January 15 2020</h1>
      <div className="flex justify-between mb-4">
        <p className="text-gray-500 text-custom16">
          Number of transaction: {numberOfTransactions}
        </p>
        <p className="text-gray-500 text-custom16">
          Value: ${totalValue.toFixed(2)}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-gray-100 shadow-md rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
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
                onClick={() => handleBookmarkTransaction(transaction.id)}
                className="ml-4 p-2 rounded-md bg-gray-200 text-gray-600">
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
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </button>
              <button
                onClick={() => handleDeleteTransaction(transaction.id)}
                className="ml-4 p-2 rounded-md bg-gray-200 text-gray-600">
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
