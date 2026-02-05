import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Home = () => {
  const { auth } = useAuth();

  // If already logged in, redirect to dashboard
  if (auth?.role === "STUDENT") return <Navigate to="/student" />;
  if (auth?.role === "FACULTY") return <Navigate to="/faculty" />;
  if (auth?.role === "ADMIN") return <Navigate to="/admin" />;

  return (
    <div className="page">
      <h1>Best Student of the Year</h1>

      <p>
        A transparent and fair evaluation system combining faculty assessment
        and student participation.
      </p>

      <Link to="/login">
        <button>Login</button>
      </Link>

      <Link to="/register">
        <button style={{ marginLeft: "10px" }}>Register</button>
      </Link>
    </div>
  );
};

export default Home;
