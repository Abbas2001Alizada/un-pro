import React from "react";
import logo from "../../public/photoes/logo.png";
import { useState } from "react";
import CheckFormButton from "./checkformbutton";
import { Link } from "react-router-dom";


const Nav = ({openform}) => {
  const [isSearchFormOpen, setIsSearchFormOpen] = useState(false);

  const toggleSearchForm = () => {
    setIsSearchFormOpen(!isSearchFormOpen);
  };
  return (
    <div id="total" className="w-full md:flex lg:flex bg-red-950 text-white p-2">
      <div id="logo" className=" basis-1/2">
        {/* Logo Section */}
        <div className="flex justify-center items-center">
          <img
            src={logo}
            alt="Logo"
            className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40"
          />
        </div>

        {/* Title Section */}
        <div id="title" className="text-center my-8">
          <h1 className="text-2xl font-Akshar md:text-4xl lg:text-5xl">
            ریاست محکمه مرافعه کابل
          </h1>
          <h2 className="text-xl font-Akshar md:text-3xl lg:text-4xl mt-2">محکمه وثایق</h2>
        </div>
      </div>

      {/* Menu Section */}
      <nav id="menu" className="basis-1/2 content-center roundedlg:w-auto text-center flex md:grid lg:grid bg-[url('../../../photoes/nekahKhat.jpg')] bg-cover md:pl-4 justify-end m-4 p-4  rounded-lg">
        <a href="#home" className=" bg-white text-black text-lg md:text-xl lg:text-2xl justify-around py-2 pr-2 md:bg-white lg:bg-white md:text-green-800 lg:text-green-800  m-1 rounded text-end w-52 h-auto">
          <button id="" onClick={toggleSearchForm}>صفحه اصلی</button>
        </a>
        <a onClick={openform} href="#form" className=" bg-white text-black text-lg md:text-xl lg:text-2xl justify-around py-2 pr-2  md:bg-white lg:bg-white md:text-green-800 lg:text-green-800  m-1 rounded text-end w-52">
          <CheckFormButton onClick={toggleSearchForm}/>
        </a>
        
        <Link  to="/login" className=" bg-white text-black text-lg md:text-xl lg:text-2xl justify-around py-2 pr-2  md:bg-white lg:bg-white md:text-green-800 lg:text-green-800  m-1 rounded text-end w-52">
          <button id="">دشبورد</button>
        </Link>
      </nav>
    </div>
  );
};

export default Nav;
