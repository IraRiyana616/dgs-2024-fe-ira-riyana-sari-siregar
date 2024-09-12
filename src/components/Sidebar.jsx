import React from 'react';
import Wallets from '/src/components/wallet/Wallets';

import { GrNotification } from 'react-icons/gr';
import Category from '/src/components/category/Category';

const Sidebar = () => {
  return (
    <div className="bg-color-sidebar min-h-screen p-6  overflow-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1"></div>
        <div className="flex items-center space-x-5 ml-auto">
          <GrNotification size={24} className="text-gray-700" />
          <img
            src="https://i.pinimg.com/564x/c6/5c/d6/c65cd6b536fd82136ec5acd7648b2def.jpg"
            alt="User"
            className="h-12 w-12 object-cover rounded-full border-2 border-gray-300"
          />
          <div>Hi, Ira Riyana</div>
        </div>
      </div>
      <Wallets />
      <Category />
    </div>
  );
};

export default Sidebar;
