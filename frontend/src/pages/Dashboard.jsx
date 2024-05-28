import logo from '../../public/photoes/logo.png';
import profile from '../../public/photoes/profile.jpg';
  import React, { useState } from 'react';
  import { motion } from 'framer-motion';
  
  const Dashboard = () => {
    const user = "ali";
    if (!user) {
      return <Navigate to="/login" />;
    }
    const [selectedOption, setSelectedOption] = useState('today');
    const [dropdownOpen, setDropdownOpen] = useState(false);
  

    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-900 via-red-700 to-red-400">
        {/* Navbar */}
        <nav className="bg-red-900 text-white p-4 flex justify-between items-center">
          <div className="text-xl font-bold"><img src={logo} alt="" /></div>
          <div>
            <p className='animate-pulse opacity-0 duration-100 sm:text-xl md:text-2xl lg:text-4xl'>به دشبورد سیستم خوش آمدید</p>
          </div>

          <div className="relative">
            <img
              src={profile}
              alt="Profile"
              className="rounded-full w-10 h-10 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  بازدید از پروفایل
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  خروج
                </a>
              </div>
            )}
          </div>
        </nav>
  
        <div className="flex flex-grow">
          {/* Sidebar */}
          <aside className="bg-red-700 text-white w-1/4 p-4">
            <ul>
              <li
                className={`p-2 cursor-pointer ${selectedOption === 'today' && 'bg-red-600'}`}
                onClick={() => setSelectedOption('today')}
              >
                لیست امروز
              </li>
              <li
                className={`p-2 cursor-pointer mt-2 ${selectedOption === 'processed' && 'bg-red-600'}`}
                onClick={() => setSelectedOption('processed')}
              >
                پردازش شده
              </li>
            </ul>
          </aside>
  
          {/* Main Content */}
          <main className="flex-grow bg-gray-100 p-4">
            {selectedOption === 'today' ? (
              <section>
                <h2 className="text-xl font-semibold mb-4">لیست امروز</h2>
                <p>محتوای لیست امروز در اینجا نمایش داده می‌شود.</p>
              </section>
            ) : (
              <section>
                <h2 className="text-xl font-semibold mb-4">پردازش شده</h2>
                <p>محتوای پردازش شده در اینجا نمایش داده می‌شود.</p>
              </section>
            )}
          </main>
        </div>
      </div>
    );
  };
  
  export default Dashboard;
  