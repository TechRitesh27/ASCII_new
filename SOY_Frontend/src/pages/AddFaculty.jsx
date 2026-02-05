import { useState } from "react";
import api from "../api/api";

const AddFaculty = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    department: "",
    designation: "",
    contactNumber: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await api.post("/admin/faculty/add", form);

      setMessage(
        `✅ Faculty added successfully.
College ID: ${res.data.collegeId}
Temporary password has been sent to the registered email.`
      );

      setForm({
        fullName: "",
        email: "",
        department: "",
        designation: "",
        contactNumber: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "❌ Unable to add faculty. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h2>Add Faculty</h2>

      <form className="form" onSubmit={handleSubmit}>
        <input
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
          required
        />

        <input
          name="designation"
          placeholder="Designation"
          value={form.designation}
          onChange={handleChange}
          required
        />

        <input
          name="contactNumber"
          placeholder="Contact Number"
          value={form.contactNumber}
          onChange={handleChange}
          required
        />

        <button disabled={loading}>
          {loading ? "Adding Faculty..." : "Add Faculty"}
        </button>

        {message && (
          <p className="success" style={{ whiteSpace: "pre-line" }}>
            {message}
          </p>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default AddFaculty;
