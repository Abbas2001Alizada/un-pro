import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      <h1>welcome to the dashbaord</h1>
      <Link to="/child/registeration">Child Registration</Link>
    </div>
  );
};

export default Dashboard;
