import { FaEdit, FaTrash } from 'react-icons/fa';

const WalletList = ({ wallets, onEdit, onDelete }) => {
  return (
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
                onClick={() => onEdit(wallet.id)}
                className="text-blue-500 hover:text-blue-700 transition-colors duration-300 ease-in-out flex items-center">
                <FaEdit className="mr-1" />
              </button>
              <button
                onClick={() => onDelete(wallet.id)}
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
  );
};

export default WalletList;
