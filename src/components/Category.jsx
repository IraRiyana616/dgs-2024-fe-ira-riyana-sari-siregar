import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import {
  FaDollarSign,
  FaGraduationCap,
  FaHeadphonesAlt,
  FaShoppingBag,
} from 'react-icons/fa';
import { AiOutlineWallet } from 'react-icons/ai';

const Category = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      icon: <FaDollarSign size={24} />,
      title: 'Bills',
      amount: 235000,
      date: null,
    },
    {
      id: 2,
      icon: <FaGraduationCap size={24} />,
      title: 'Education',
      amount: 125000,
      date: null,
    },
    {
      id: 3,
      icon: <FaHeadphonesAlt size={24} />,
      title: 'Utility',
      amount: null,
      date: '25 April',
    },
    {
      id: 4,
      icon: <FaShoppingBag size={24} />,
      title: 'Shopping',
      amount: null,
      date: '25 April',
    },
  ]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [newCategoryAmount, setNewCategoryAmount] = useState('');
  const [newCategoryDate, setNewCategoryDate] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  const handleDeleteCategory = (id) => {
    setCategoryToDelete(id);
    setIsConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (categoryToDelete) {
      setCategories(
        categories.filter((category) => category.id !== categoryToDelete)
      );
      setIsConfirmOpen(false);
      setCategoryToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmOpen(false);
    setCategoryToDelete(null);
  };

  const handleAddCategory = () => {
    setIsPopupOpen(true);
    setIsEditing(false);
    setEditingCategoryId(null);
    setNewCategoryTitle('');
    setNewCategoryAmount('');
    setNewCategoryDate('');
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setIsEditing(false);
    setEditingCategoryId(null);
    setNewCategoryTitle('');
    setNewCategoryAmount('');
    setNewCategoryDate('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setNewCategoryTitle(value);
    } else if (name === 'amount') {
      setNewCategoryAmount(value);
    } else if (name === 'date') {
      setNewCategoryDate(value);
    }
  };

  const handleSubmit = () => {
    if (isEditing) {
      const updatedCategories = categories.map((category) =>
        category.id === editingCategoryId
          ? {
              ...category,
              title: newCategoryTitle,
              amount: newCategoryAmount
                ? parseInt(newCategoryAmount, 10)
                : null,
              date: newCategoryDate || null,
            }
          : category
      );
      setCategories(updatedCategories);
      setIsEditing(false);
      setEditingCategoryId(null);
    } else {
      const newCategory = {
        id: categories.length + 1,
        icon: <FaShoppingBag size={24} />, // Default icon, you can customize this
        title: newCategoryTitle,
        amount: newCategoryAmount ? parseInt(newCategoryAmount, 10) : null,
        date: newCategoryDate || null,
      };
      setCategories([...categories, newCategory]);
    }
    handleClosePopup();
  };

  const handleEditCategory = (id) => {
    const categoryToEdit = categories.find((category) => category.id === id);
    if (categoryToEdit) {
      setIsPopupOpen(true);
      setIsEditing(true);
      setEditingCategoryId(id);
      setNewCategoryTitle(categoryToEdit.title);
      setNewCategoryAmount(
        categoryToEdit.amount ? categoryToEdit.amount.toString() : ''
      );
      setNewCategoryDate(categoryToEdit.date || '');
    }
  };

  // Filter categories to exclude those with empty amount and date
  const filteredCategories = categories.filter(
    (category) =>
      (category.amount !== null && category.amount !== '') ||
      (category.date !== null && category.date !== '')
  );

  return (
    <div className="container mx-auto mt-10">
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

      {isPopupOpen && (
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
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out">
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out">
                {isEditing ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}

      {isConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Confirm Delete
            </h2>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this category?
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
};

export default Category;
