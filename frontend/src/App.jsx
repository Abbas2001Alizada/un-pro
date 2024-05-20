// import Nav from "./component/Nav/App";
// import Instruction from "./component/instruction/App";
// import Footer from "./component/fotter/App";
// import SearchForm from "./component/checking/App";
// import { useState } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import RegisterChild from "./pages/RegisterChild";
import DefaultLayout from "./pages/DefaultLayout";
function App() {
  // const [isFormOpen, setIsFormOpen] = useState(false);

  // const toggleForm = () => {
  //   setIsFormOpen(!isFormOpen);
  // };
  // const [isWindowOpen, setIsWindowOpen] = useState(false);
  // const toggleWindow = () => {
  //   setIsWindowOpen(!isWindow);
  // };
  return (
    <>
      {/* <Link to="/dashoard">Dashboard</Link> */}
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<DefaultLayout />} />
          <Route path="/child/registeration" element={<RegisterChild />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
