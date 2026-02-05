import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../auth/AuthContext";

const Login = () => {
  const [collegeId, setCollegeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        collegeId,
        password,
      });

      login(res.data.token, res.data.role);

      if (res.data.role === "STUDENT") navigate("/student");
      else if (res.data.role === "FACULTY") navigate("/faculty");
      else if (res.data.role === "ADMIN") navigate("/admin");

    } catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid College ID or password");
      } else if (err.response?.status === 403) {
        setError("Your account is inactive. Contact admin.");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <form className="form" onSubmit={handleLogin}>
        <h2>Login</h2>

        <input
          type="text"
          placeholder="College ID"
          value={collegeId}
          onChange={(e) => setCollegeId(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
