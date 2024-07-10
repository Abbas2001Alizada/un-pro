
import { BrowserRouter, Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterChild from "./pages/RegisterChild";
import DefaultLayout from "./pages/DefaultLayout.jsx";
import Dashboard from "./pages/AdminDashboard.jsx";
import Record from "./pages/Record.jsx";
import Profilepage from "./pages/Profilepage.jsx";
import AddminDashboard from "./pages/AdminDashboard.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import PendingAppointment from "./component/pendingAppointment.jsx";
import ProcessingAppointment from "./component/processingAppointment.jsx";
import Completed from "./component/Complete.jsx";

function App() {

  return (
    <>
      {/* <Link to="/dashoard">Dashboard</Link> */}
      <BrowserRouter>
        <Routes>
          <Route path="/records" element={<Record />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/AdminDashboard/:id" element={<AddminDashboard />} />
          <Route path="/UserDashboard/:id" element={<UserDashboard />} />
          <Route path="/" element={<DefaultLayout />} />
          <Route path="/pending" element={<PendingAppointment />} />
          <Route path="/processing" element={<ProcessingAppointment />} />
          <Route path="/done" element={<Completed />} />
          <Route path="/profile/*" element={<Profilepage />} />
          <Route path="/child/registeration" element={<RegisterChild />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
