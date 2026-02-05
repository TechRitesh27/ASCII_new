import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar">
      {/* -------- Logo -------- */}
      <div className="navbar-left">
        <h2 className="logo" onClick={() => navigate("/")}>
          ASCII – SOY
        </h2>
      </div>

      {/* -------- Navigation Links -------- */}
      <div className="nav-links">

        {/* Common */}
        <Link to="/">Home</Link>

        {/* STUDENT */}
        {auth?.role === "STUDENT" && (
          <>
            <Link to="/student/nominate">Nomination</Link>
            <Link to="/student/vote">Voting</Link>
            <Link to="/profile">Profile</Link>
          </>
        )}

        {/* FACULTY */}
        {auth?.role === "FACULTY" && (
          <>
            <Link to="/faculty/nominations">Nominations</Link>
            <Link to="/profile">Profile</Link>
          </>
        )}

        {/* ADMIN */}
        {auth?.role === "ADMIN" && (
          <>
            <Link to="/admin/result">Final Result</Link>
            <Link to="/profile">Profile</Link>
          </>
        )}

        {/* AUTH ACTION */}
        {auth ? (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link className="login-btn" to="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
