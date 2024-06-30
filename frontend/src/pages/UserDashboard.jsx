import axios from "axios";
import logo from "../../public/photoes/logo.png";
import profile from "../../public/photoes/profile.jpg";
import React, { useEffect, useState } from "react";
import { Link, useMatch, useParams } from "react-router-dom";
import RegisterUser from "./RegisterUser";
import DeleteUser from "./deleteUser";
import Report from "./Report";
import AddWitness from "./AddWitness";
import CheckForm from "../component/checkForm";
import CheckFormButton from "../component/checkformbutton";
import RegisterChild from "./RegisterChild";

const AddminDashboard = () => {
 const match = useMatch('/UserDashboard/:id');
  const id = match.params.id;
  const[previewUrl,setPreviewUrl]=useState()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8038/users/${id}`);
        const { name, username,password, email, image,role } = response.data;
        setPreviewUrl(`http://localhost:8038/uploads/${image}`);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [id])
 

 
  const [selectedOption, setSelectedOption] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-900 via-red-700 to-red-400">
      {/* Navbar */}
      <nav className="bg-red-950 text-white p-4 flex justify-between items-center">
        <div className="text-xl font-bold">
          <img src={logo} alt="" />
        </div>
        <div>
          <p className="animate-pulse opacity-0 duration-100 sm:text-xl md:text-2xl lg:text-4xl gradiant-text">
            به دشبورد سیستم خوش آمدید
          </p>
        </div>

        <div className="relative">
          <img
            src={previewUrl}
            alt="Profile"
            className="rounded-full w-10 h-10 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
           
                <Link to={`/profile/${id}`}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <button>بازدید از پروفایل</button>
                </Link>
              <Link to='/'
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                
                  <button>خروج از دشبورد</button>
              </Link>            </div>
          )}
        </div>
      </nav>

      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="bg-red-700 text-white w-1/4 p-4">
          <ul>
            <li
              className={`p-2 cursor-pointer flex ${
                selectedOption === "Checking" && "bg-red-600"
              }`}
              onClick={() => setSelectedOption("Checking")}
            ><CheckFormButton />
            </li>
            <li
              className={`p-2 cursor-pointer mt-2 ${
                selectedOption === "AddWitness" && "bg-red-600"
              }`}
              onClick={() => setSelectedOption("AddWitness")}
            >
              اضافه نمودن شاهد
            </li>
            <li
              className={`p-2 cursor-pointer mt-2 ${
                selectedOption === "AddChild" && "bg-red-600"
              }`}
              onClick={() => setSelectedOption("AddChild")}
            >
              اضافه نمودن فرزند
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-grow bg-gray-100 p-4">
          {selectedOption === "Checking" ? (
            <section className=" dir-rtl">
              <h2 className="text-xl font-semibold mb-4">بررسی نوبت</h2>
            
            </section>
          ) : selectedOption==='AddWitness'?(
            <section>
              <h2 className="text-xl font-semibold mb-4">اضافه نمودن شاهد</h2>
              <AddWitness/>
            </section>
          ):selectedOption==='AddChild'?(            <section>
            <h2 className="text-xl font-semibold mb-4">اضافه نمودن فرزند </h2>
            <RegisterChild/>
          </section>):
          (<section>
        </section>)}
        </main>
      </div>
    </div>
  );
};

export default AddminDashboard;
