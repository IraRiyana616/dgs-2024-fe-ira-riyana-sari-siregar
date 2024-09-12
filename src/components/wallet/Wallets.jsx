import { useState } from 'react';
import { AiFillHome, AiOutlineBarChart } from 'react-icons/ai';
import WalletList from './WalletList';
import WalletForm from './WalletForm';
import ConfirmDeleteDialog from './ConfirmDelete';
import { formatBalance, parseBalance } from '/src/utils/utils';

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

      <WalletList
        wallets={wallets}
        onEdit={handleEditWallet}
        onDelete={handleDeleteWallet}
      />

      {isPopupOpen && (
        <WalletForm
          isEditing={isEditing}
          name={newWalletName}
          balance={newWalletBalance}
          onInputChange={handleInputChange}
          onClose={handleClosePopup}
          onSubmit={handleSubmit}
        />
      )}

      {isConfirmOpen && (
        <ConfirmDeleteDialog
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}

export default Wallets;
