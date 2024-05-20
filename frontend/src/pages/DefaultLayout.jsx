import Nav from "../component/Nav/Navbbar";
import Instruction from "../component/instruction/instruction";
import Footer from "../component/fotter/footer";
import SearchForm from "../component/checking/checkform";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const DefaultLayout = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const toggleWindow = () => {
    setIsWindowOpen(!isWindow);
  };
  return (
    <div>
      <div className="main-page">
        <Nav openForm={toggleForm} />
        <Instruction openWindow={toggleWindow} />
        <Footer />
      </div>
      {/* render the dashboard pages  */}
      <Outlet />
    </div>
  );
};

export default DefaultLayout;
