import React, { createContext, useState, useContext } from 'react';
import {
  FaDollarSign,
  FaGraduationCap,
  FaHeadphonesAlt,
  FaShoppingBag,
} from 'react-icons/fa';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
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
    if (name === 'title') setNewCategoryTitle(value);
    else if (name === 'amount') setNewCategoryAmount(value);
    else if (name === 'date') setNewCategoryDate(value);
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
        icon: <FaShoppingBag size={24} />,
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

  const filteredCategories = categories.filter(
    (category) =>
      (category.amount !== null && category.amount !== '') ||
      (category.date !== null && category.date !== '')
  );

  return (
    <CategoryContext.Provider
      value={{
        categories,
        isPopupOpen,
        newCategoryTitle,
        newCategoryAmount,
        newCategoryDate,
        isEditing,
        editingCategoryId,
        isConfirmOpen,
        categoryToDelete,
        handleDeleteCategory,
        handleConfirmDelete,
        handleCancelDelete,
        handleAddCategory,
        handleClosePopup,
        handleInputChange,
        handleSubmit,
        handleEditCategory,
        filteredCategories,
      }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
