import React from 'react';
import { useCategory } from './CategoryContext';

const ConfirmDialog = () => {
  const { isConfirmOpen, handleConfirmDelete, handleCancelDelete } =
    useCategory();

  if (!isConfirmOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md transition-transform transform scale-100 hover:scale-105">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Confirm Delete
        </h2>
        <p className="text-gray-700 mb-4">
          Are you sure you want to delete this category?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleCancelDelete}
            className="bg-gray-300 text-gray-800 rounded px-4 py-2 hover:bg-gray-400 transition-colors duration-300 ease-in-out">
            Cancel
          </button>
          <button
            onClick={handleConfirmDelete}
            className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition-colors duration-300 ease-in-out">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
