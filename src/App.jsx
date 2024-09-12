import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Router>
      <div className="flex w-full h-screen justify-between">
        <div className="w-[68%]">
          <Navbar />
        </div>

        <div className="w-[32%] bg-gray-100">
          <Sidebar />
        </div>
      </div>
    </Router>
  );
}

export default App;
