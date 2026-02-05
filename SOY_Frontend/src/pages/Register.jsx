import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../auth/AuthContext";
import "./Dashboards.css";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    studentClass: "",
    division: "",
    rollNumber: "",
    contactNumber: "",
    email: "",
    password: "",
  });

  const [collegeId, setCollegeId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/register", formData);

      // 🔹 Auto-login
      login(res.data.token, res.data.role);

      // 🔹 Show College ID
      setCollegeId(res.data.collegeId);

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // 🎉 SUCCESS SCREEN
  if (collegeId) {
    return (
      <div className="page success-card">
        <h2>🎉 Registration Successful!</h2>

        <p>Please save your <strong>College ID</strong>.</p>

        <div className="college-id-box">
          <span>{collegeId}</span>
        </div>

        <p className="note">
          You will use this College ID to log in.
        </p>

        <button onClick={() => navigate("/student")}>
          Go to Dashboard
        </button>
      </div>
    );
  }

  // 📝 REGISTRATION FORM
  return (
    <div className="page">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Student Registration</h2>

        <input name="fullName" placeholder="Full Name" required onChange={handleChange} />
        
        <select name="studentClass" required onChange={handleChange}>
          <option value="">Select Class</option>
          <option value="FE">FE</option>
          <option value="SE">SE</option>
          <option value="TE">TE</option>
          <option value="BE">BE</option>
        </select>

        <input name="division" placeholder="Division" required onChange={handleChange} />
        <input name="rollNumber" type="number" placeholder="Roll Number" required onChange={handleChange} />
        <input name="contactNumber" placeholder="Contact Number" required onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" required onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" required onChange={handleChange} />

        <button disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Register;
