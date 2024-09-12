import { useState } from 'react';
import { AiFillHome, AiOutlineBarChart } from 'react-icons/ai';
import { FaEdit, FaTrash } from 'react-icons/fa';

function Wallets() {
  const [wallets, setWallets] = useState([
    {
      id: 1,
      name: 'Home Wallet',
      balance: '$235,000',
      icon: <AiFillHome size={24} />,
    },
    {
      id: 2,
      name: 'Investment',
      balance: '$875,000',
      icon: <AiOutlineBarChart size={24} />,
    },
  ]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newWalletName, setNewWalletName] = useState('');
  const [newWalletBalance, setNewWalletBalance] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingWalletId, setEditingWalletId] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [walletToDelete, setWalletToDelete] = useState(null);

  const formatBalance = (balance) => {
    const numericValue = balance.replace(/[^0-9]/g, '');
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const parseBalance = (balance) => balance.replace(/[^0-9]/g, '');

  const handleDeleteWallet = (id) => {
    setWalletToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (walletToDelete) {
      setWallets(wallets.filter((wallet) => wallet.id !== walletToDelete));
      setIsConfirmOpen(false);
      setWalletToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
    setWalletToDelete(null);
  };

  const handleAddWallet = () => {
    setIsPopupOpen(true);
    setIsEditing(false);
    setEditingWalletId(null);
    setNewWalletName('');
    setNewWalletBalance('');
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setIsEditing(false);
    setEditingWalletId(null);
    setNewWalletName('');
    setNewWalletBalance('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setNewWalletName(value);
    } else if (name === 'balance') {
      setNewWalletBalance(value);
    }
  };

  const handleSubmit = () => {
    const formattedBalance = `$${formatBalance(newWalletBalance)}`;
    if (isEditing) {
      setWallets(
        wallets.map((wallet) =>
          wallet.id === editingWalletId
            ? { ...wallet, name: newWalletName, balance: formattedBalance }
            : wallet
        )
      );
    } else {
      const newWallet = {
        id: wallets.length + 1,
        name: newWalletName,
        balance: formattedBalance,
        icon: <AiFillHome size={24} />,
      };
      setWallets([...wallets, newWallet]);
    }
    handleClosePopup();
  };

  const handleEditWallet = (id) => {
    const walletToEdit = wallets.find((wallet) => wallet.id === id);
    if (walletToEdit) {
      setIsPopupOpen(true);
      setIsEditing(true);
      setEditingWalletId(id);
      setNewWalletName(walletToEdit.name);
      setNewWalletBalance(parseBalance(walletToEdit.balance));
    }
  };

  return (
    <div className="bg-color-sidebar rounded-lg mt-11 max-w-md mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Wallets</h2>
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={handleAddWallet}>
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

      <ul className="space-y-4">
        {wallets.length > 0 ? (
          wallets.map((wallet) => (
            <li
              key={wallet.id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 rounded-full p-3">
                  <span className="text-purple-600 text-xl">{wallet.icon}</span>
                </div>
                <div>
                  <h3 className="text-gray-800 font-medium text-lg">
                    {wallet.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{wallet.balance}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditWallet(wallet.id)}
                  className="text-blue-500 hover:text-blue-700 transition-colors duration-300 ease-in-out flex items-center">
                  <FaEdit className="mr-1" />
                </button>
                <button
                  onClick={() => handleDeleteWallet(wallet.id)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-300 ease-in-out flex items-center">
                  <FaTrash className="mr-1" />
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-600 text-center">No wallets found</p>
        )}
      </ul>

      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md transition-transform transform scale-100 hover:scale-105">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              {isEditing ? 'Edit Wallet' : 'Add New Wallet'}
            </h2>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-semibold mb-2">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={newWalletName}
                onChange={handleInputChange}
                className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="balance"
                className="block text-gray-700 text-sm font-semibold mb-2">
                Balance:
              </label>
              <input
                type="text"
                id="balance"
                name="balance"
                value={newWalletBalance}
                onChange={handleInputChange}
                className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleClosePopup}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                {isEditing ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}

      {isConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md transition-transform transform scale-100 hover:scale-105">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Confirm Delete
            </h2>
            <p className="text-gray-700 mb-4">
              Are you sure you want to delete this wallet?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Wallets;
