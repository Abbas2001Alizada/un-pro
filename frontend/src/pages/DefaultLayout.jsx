import Nav from "../component/Nav/App";
import Instruction from "../component/instruction/App";
import Footer from "../component/fotter/App";
import SearchForm from "../component/checking/App";
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
