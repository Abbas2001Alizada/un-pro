
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterChild from "./pages/RegisterChild";
import DefaultLayout from "./pages/DefaultLayout";
import Dashboard from "./pages/Dashboard";
function App() {

  return (
    <>
      {/* <Link to="/dashoard">Dashboard</Link> */}
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<DefaultLayout />} />
          <Route path="/child/registeration" element={<RegisterChild />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
