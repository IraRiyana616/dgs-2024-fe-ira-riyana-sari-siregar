import { useState } from 'react';
import logo from '/src/assets/icons/logo.png';
import images from '/src/assets/images/wallet.png';
import '/src/index.css';
import Transactions from '/src/components/Transaction';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('dates');

  const tabs = [
    'Group By',
    'Realisation',
    'Dates',
    'Types',
    'Sample',
    'Extended',
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleCalendarClick = () => {
    window.open('https://calendar.google.com', '_blank');
  };

  return (
    <div className="bg-gray-50 min-h-screen p-5">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-16 h-16 mr-4" />
        </div>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="rounded-lg px-4 py-2 border border-gray-300 pl-10"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="20"
              height="20">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.35-4.35"
              />
            </svg>
          </div>

          <div className=" text-gray-300 font-semibold py-2 px-4 rounded-lg">
            Overview
          </div>
          <div className=" text-black font-semibold py-2 px-4 rounded-lg">
            Finance
          </div>
          <div className="text-gray-300 font-semibold py-2 px-4 rounded-lg">
            Calendar
          </div>
          <div className="text-gray-300 font-semibold py-2 px-4">Event</div>
        </div>
      </div>

      {/* Wallets and Calendar */}
      <div className="flex items-center justify-between mb-6">
        {/* Wallets */}
        <div className="flex items-center space-x-4">
          <img src={images} alt="Wallet" className="w-16 h-16" />
          <div className="flex flex-col">
            <h2 className="text-custom24 font-bold text-blue-500">
              Home Wallet
            </h2>
            <p className="text-gray-600">Change default wallet</p>
          </div>
        </div>

        {/* Calendar */}
        <div className="flex items-center space-x-4">
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded-lg flex items-center"
            onClick={handleCalendarClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Calendar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4 ml-10 mt-16">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`bg-gray-200 hover:bg-gray-300 text-gray-600  font-bold py-2 px-4 rounded-lg ${
              activeTab === tab ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => handleTabClick(tab)}>
            {tab.replace('-', ' ')}
          </button>
        ))}
        <button className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded-lg w-[3rem] flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      <Transactions />
    </div>
  );
};

export default Navbar;
