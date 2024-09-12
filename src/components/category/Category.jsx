import React from 'react';
import { CategoryProvider, useCategory } from './CategoryContext';
import CategoryList from './CategoryList';
import PopupForm from './PopupForm';
import ConfirmDialog from './ConfirmDialog';

const Category = () => {
  const { handleAddCategory } = useCategory();

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Categories</h2>
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={handleAddCategory}>
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
          Add Category
        </button>
      </div>
      <CategoryList />
      <PopupForm />
      <ConfirmDialog />
    </div>
  );
};

const App = () => (
  <CategoryProvider>
    <Category />
  </CategoryProvider>
);

export default App;
