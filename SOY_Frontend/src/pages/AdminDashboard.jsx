import { Link, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const AdminDashboard = () => {
  return (
    <>
      <Navbar />

      <div className="dashboard">
        <h2>Admin Dashboard</h2>

        <nav className="dashboard-menu">
          <ul>
            <li>
              <Link to="result">Final Result</Link>
            </li>

            <li>
              <Link to="faculty/add">Add Faculty</Link>
            </li>

            <li>
              <Link to="faculty/list">View Faculties</Link>
            </li>

            <li>
              <Link to="students">Manage Students</Link>
            </li>

            <li>
              <Link to="faculties">Manage Faculty</Link>
            </li>
          </ul>
        </nav>

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminDashboard;
