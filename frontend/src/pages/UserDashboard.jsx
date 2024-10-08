import axios from "axios";
import logo from "../../public/photoes/logo.png";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterWitness from "./RegisterWitness.jsx";
import RegisterChild from "./RegisterChild";
import Search from '../component/Search.jsx'
import Completion from "./completion.jsx";
import CoupleFinder from "./findCouple.jsx";

const AddminDashboard = () => {
  const token = sessionStorage.getItem("token");
  const id = sessionStorage.getItem("id");
  const [previewUrl, setPreviewUrl] = useState();
  const [selectedOption, setSelectedOption] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const useLogout = () => {
    const logout = () => {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("id");
      sessionStorage.removeItem("zone");
      navigate("/");
    };
    return logout;
  };

  if (!token) {
    navigate("/login");
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8038/users/${id}`);
        const { image } = response.data;
        setPreviewUrl(`http://localhost:8038/uploads/${image}`);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-gradient-to-br from-red-900 via-red-700 to-red-400">
      {/* Navbar */}
      <nav dir="ltr" className="bg-red-950 text-white p-4 flex justify-between items-center">
        <div className="text-xl font-bold">
          <img src={logo} alt="Logo" className="size-14" />
        </div>
        <div>
          <p className="animate-pulse opacity-0 duration-100 sm:text-xl md:text-2xl lg:text-4xl gradient-text">
            به دشبورد سیستم خوش آمدید
          </p>
        </div>
        <div className="relative">
          <img
            src={previewUrl}
            alt="Profile"
            className="rounded-full w-14 h-14 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && (
            <div className=" z-20 absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
              <Link to={`/profile/${id}`} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                <button>بازدید از پروفایل</button>
              </Link>
              <Link onClick={useLogout()} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                <button>خروج از دشبورد</button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      <div className="flex flex-grow flex-col md:flex-row">
        {/* Hamburger Menu for Mobile */}
        <div className="bg-red-950 text-white p-4 md:hidden flex justify-between items-center">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-xl font-bold">
            ☰
          </button>
        </div>

        {/* Sidebar */}
        <aside className={`bg-red-700 text-white w-full md:w-1/4 p-4 transform ${sidebarOpen ? "translate-x-0" : "hidden md:flex lg:flex -translate-x-full"} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
          <ul>
            <li className={`p-2 cursor-pointer ${selectedOption === "Checking" && "bg-red-600"}`} onClick={() => setSelectedOption("Checking")}>
              بررسی نوبت
            </li>
            <li className={`p-2 cursor-pointer ${selectedOption === "AddWitness" && "bg-red-600"}`} onClick={() => setSelectedOption("AddWitness")}>
              اضافه نمودن شاهد
            </li>
            <li className={`p-2 cursor-pointer ${selectedOption === "AddChild" && "bg-red-600"}`} onClick={() => setSelectedOption("AddChild")}>
              اضافه نمودن فرزند
            </li>
            <li className={`p-2 cursor-pointer ${selectedOption === "findCouple" && "bg-red-600"}`} onClick={() => setSelectedOption("findCouple")}>
              جستجوی خانواده
            </li>
            <li className={`p-2 cursor-pointer ${selectedOption === "done process" && "bg-red-600"}`} onClick={() => setSelectedOption("done process")}>
              تحویل نکاح خط
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-grow bg-gray-100 p-4">
          {selectedOption === "Checking" ? (
            <section className="dir-rtl">
              <h2 className="text-xl font-semibold mb-4">بررسی نوبت</h2>
              <Search />
            </section>
          ) : selectedOption === "AddWitness" ? (
            <section>
              <h2 className="text-xl font-semibold mb-4">اضافه نمودن شاهد</h2>
              <RegisterWitness id={id} />
            </section>
          ) : selectedOption === "done process" ? (
            <section>
              <h2 className="text-xl font-semibold mb-4">تحویل نکاح خط</h2>
              <Completion id={id} />
            </section>
          ) : selectedOption === "findCouple" ? (
            <section>
              <h2 className="text-xl font-semibold mb-4">جستجوی خانواده</h2>
              <CoupleFinder id={id} />
            </section>
          ) : selectedOption === "AddChild" ? (
            <section>
              <h2 className="text-xl font-semibold mb-4">اضافه نمودن فرزند</h2>
              <RegisterChild id={id} />
            </section>
          ) : (
            <section></section>
          )}
        </main>
      </div>
    </div>
  );
};

export default AddminDashboard;
