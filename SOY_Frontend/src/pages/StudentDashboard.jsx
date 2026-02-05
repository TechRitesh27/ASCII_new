import { Outlet, NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <h3 className="sidebar-title">Student Panel</h3>

          <NavLink to="/student/nominate" className="sidebar-link">
            Nomination
          </NavLink>

          <NavLink to="/student/vote" className="sidebar-link">
            Voting
          </NavLink>

          <NavLink to="/profile" className="sidebar-link">
            My Profile
          </NavLink>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default StudentDashboard;
