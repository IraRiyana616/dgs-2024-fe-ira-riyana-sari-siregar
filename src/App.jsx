import './App.css';
import Navbar from '/src/components/Navbar';

import Sidebar from '/src/components/Sidebar';

function App() {
  return (
    <div className="flex w-full h-screen justify-between">
      {/* Navbar dengan lebar 65% */}
      <div className="w-[68%]">
        <Navbar />
      </div>

      {/* Sidebar dengan lebar 35% */}
      <div className="w-[32%] bg-gray-100">
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
