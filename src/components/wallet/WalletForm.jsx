const WalletForm = ({
  isEditing,
  name,
  balance,
  onInputChange,
  onClose,
  onSubmit,
}) => {
  return (
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
            value={name}
            onChange={onInputChange}
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
            value={balance}
            onChange={onInputChange}
            className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded transition-colors duration-300 ease-in-out">
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 ease-in-out">
            {isEditing ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletForm;
