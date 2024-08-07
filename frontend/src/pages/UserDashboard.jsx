import axios from "axios";
import logo from "../../public/photoes/logo.png";
import profile from "../../public/photoes/profile.jpg";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useMatch, useNavigate, useParams } from "react-router-dom";
import RegisterUser from "./RegisterUser";
import DeleteUser from "./deleteUser";
import Report from "./Report";
import RegisterWitness from "./RegisterWitness.jsx";
import RegisterChild from "./RegisterChild";
import Search from '../component/Search.jsx'
import  Completion from "./completion.jsx";
import CoupleFinder from "./findCouple.jsx";

const AddminDashboard = () => {
  const token = sessionStorage.getItem("token");
  const match = useMatch('/UserDashboard/:id');
  const id = sessionStorage.getItem("id");
  const [previewUrl, setPreviewUrl] = useState();
  const navigate=useNavigate()

  const useLogout = () => {

    const logout = () => {
      // Remove the token from localStorage or cookies
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("id");

      // Redirect to the login page
      navigate("/");
    };

    return logout;
  };

  useEffect(() => {
    const fetchUser = async () => {
      try { if (!token) {
    navigate("/login")
 }
        const response = await axios.get(`http://localhost:8038/users/${id}`);
        const { image } = response.data;
        setPreviewUrl(`http://localhost:8038/uploads/${image}`);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [id]);

  const [selectedOption, setSelectedOption] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-gradient-to-br from-red-900 via-red-700 to-red-400">
      {/* Navbar */}
      <nav dir="ltr" className="bg-red-950 text-white p-4 flex justify-between items-center">
        <div className="text-xl font-bold">
          <img src={logo} alt="Logo" className=" size-14" />
        </div>
        <div>
          <p className="hidden md:block animate-pulse opacity-0 duration-100 sm:text-xl md:text-2xl lg:text-4xl gradiant-text">
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
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
              <Link to={`/profile/${id}`}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <button>بازدید از پروفایل</button>
              </Link>
              <Link onClick={useLogout()} to='/'
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                <button >خروج از دشبورد</button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      <div className="flex flex-col md:flex-row flex-grow">
        {/* Sidebar */}
        <aside className="bg-red-700 text-white w-full md:w-1/5 p-4">
          <ul>
            <li
              className={`p-2 cursor-pointer flex ${selectedOption === "Checking" && "bg-red-600"}`}
              onClick={() => setSelectedOption("Checking")}
            ><Search/>
            </li>
            <li
              className={`p-2 cursor-pointer mt-2 ${selectedOption === "AddWitness" && "bg-red-600"}`}
              onClick={() => setSelectedOption("AddWitness")}
            >
              اضافه نمودن شاهد
            </li>
            <li
              className={`p-2 cursor-pointer mt-2 ${selectedOption === "AddChild" && "bg-red-600"}`}
              onClick={() => setSelectedOption("AddChild")}
            >
              اضافه نمودن فرزند
            </li>
            <li
              className={`p-2 cursor-pointer mt-2 ${selectedOption === "findCouple" && "bg-red-600"}`}
              onClick={() => setSelectedOption("findCouple")}
            >
              جستجوی خانواده
            </li>
            <li
              className={`p-2 cursor-pointer mt-2 ${selectedOption === "done process" && "bg-red-600"}`}
              onClick={() => setSelectedOption("done process")}
            >
              تحویل نکاح خط
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-grow bg-gray-100 p-4">
          {selectedOption === "Checking" ? (
            <section className="dir-rtl">
              <h2 className="text-xl font-semibold mb-4">بررسی نوبت</h2>
            </section>
          ) : selectedOption === 'AddWitness' ? (
            <section>
              <h2 className="text-xl font-semibold mb-4">اضافه نمودن شاهد</h2>
              <RegisterWitness id={id}/>
            </section>
          ) : selectedOption === 'done process' ? (
            <section>
              <h2 className="text-xl font-semibold mb-4">تحویل نکاح خط</h2>
              <Completion id={id}/>
            </section>
          ) : selectedOption === 'findCouple' ? (
            <section>
              <h2 className="text-xl font-semibold mb-4">جستجوی خانواده</h2>
              <CoupleFinder id={id}/>
            </section>
          ) : selectedOption === 'AddChild' ? (
            <section>
              <h2 className="text-xl font-semibold mb-4">اضافه نمودن فرزند</h2>
              <RegisterChild id={id}/>
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
