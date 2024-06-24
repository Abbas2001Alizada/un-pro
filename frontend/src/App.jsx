
import { BrowserRouter, Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterChild from "./pages/RegisterChild";
import DefaultLayout from "./pages/DefaultLayout.jsx";
import Dashboard from "./pages/Dashboard";
import Record from "./pages/Record.jsx";
import Profilepage from "./pages/Profilepage.jsx";

function App() {

  return (
    <>
      {/* <Link to="/dashoard">Dashboard</Link> */}
      <BrowserRouter>
        <Routes>
          <Route path="/records" element={<Record />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/" element={<DefaultLayout />} />
          <Route path="/profile/*" element={<Profilepage />} />
          <Route path="/child/registeration" element={<RegisterChild />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
