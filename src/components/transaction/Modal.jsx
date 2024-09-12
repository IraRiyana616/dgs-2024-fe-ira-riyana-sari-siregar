import React from 'react';

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

export default Modal;
