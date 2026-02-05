import { Outlet, NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./FacultyDashboard.css";

const FacultyDashboard = () => {
  return (
    <>
      <Navbar />

      <div className="faculty-dashboard">
        <aside className="faculty-sidebar">
          <h3>Faculty Panel</h3>

          <NavLink to="nominations">📄 Student Nominations</NavLink>
          <NavLink to="evaluations/my">My Evaluations</NavLink>
          {/* <li><Link to="evaluations/my">My Evaluations</Link></li> */}
          <NavLink to="profile">👤 My Profile</NavLink>
        </aside>

        <main className="faculty-content">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default FacultyDashboard;
