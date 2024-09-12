import React from 'react';
import { useCategory } from './CategoryContext';

const PopupForm = () => {
  const {
    isPopupOpen,
    newCategoryTitle,
    newCategoryAmount,
    newCategoryDate,
    isEditing,
    handleInputChange,
    handleSubmit,
    handleClosePopup,
  } = useCategory();

  if (!isPopupOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md transition-transform transform scale-100 hover:scale-105">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          {isEditing ? 'Edit Category' : 'Add New Category'}
        </h2>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-semibold mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newCategoryTitle}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-gray-700 text-sm font-semibold mb-2">
            Amount:
          </label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={newCategoryAmount}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-gray-700 text-sm font-semibold mb-2">
            Date:
          </label>
          <input
            type="text"
            id="date"
            name="date"
            value={newCategoryDate}
            onChange={handleInputChange}
            className="border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleClosePopup}
            className="bg-gray-300 text-gray-800 rounded px-4 py-2 hover:bg-gray-400 transition-colors duration-300 ease-in-out">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition-colors duration-300 ease-in-out">
            {isEditing ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupForm;
