import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useCategory } from './CategoryContext';

const CategoryList = () => {
  const { filteredCategories, handleEditCategory, handleDeleteCategory } =
    useCategory();

  return (
    <ul className="space-y-4">
      {filteredCategories.map((category) => (
        <li
          key={category.id}
          className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
          <div className="flex items-center space-x-4">
            <div className="bg-purple-100 rounded-full p-3">
              <span className="text-purple-600 text-xl">{category.icon}</span>
            </div>
            <div>
              <h3 className="text-gray-800 font-medium text-lg">
                {category.title}
              </h3>
              {category.amount !== null && (
                <p className="text-custom16 font-medium mb-1">
                  ${category.amount.toLocaleString()}
                </p>
              )}
              <p className="text-gray-600 text-sm">{category.date}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleEditCategory(category.id)}
              className="text-blue-500 hover:text-blue-700 transition-colors duration-300 ease-in-out flex items-center">
              <FaEdit className="mr-1" />
            </button>

            <button
              onClick={() => handleDeleteCategory(category.id)}
              className="text-red-500 hover:text-red-700 transition-colors duration-300 ease-in-out flex items-center">
              <FaTrash className="mr-1" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
