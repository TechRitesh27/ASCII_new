import { useEffect, useState } from "react";
import api from "../api/api";
import "./StudentDashboard.css";

const NominationForm = () => {
  const [formData, setFormData] = useState({
    cgpa: "",
    majorProject: "",
    internshipDetails: "",
    achievements: "",
    leadershipRole: "",
    proofLink: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [eligible, setEligible] = useState(true);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        // 🔹 1. Fetch profile
        const profileRes = await api.get("/profile");

        if (profileRes.data.studentClass !== "BE") {
          setEligible(false);
          setError("Nomination is allowed only for BE students.");
          return;
        }

        // 🔹 2. Check nomination status
        await api.get("/nominations/my");
        setSubmitted(true);
        setMessage("You have already submitted your nomination.");

      } catch (err) {
        // 404 = no nomination → allow submission
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/nominations/submit", formData);
      setSubmitted(true);
      setMessage("Nomination submitted successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Submission failed");
    }
  };

  if (loading) return <p className="page">Checking eligibility...</p>;

  // ❌ Not eligible → stop here
  if (!eligible) {
    return (
      <div className="page">
        <h2>Student Self-Nomination</h2>
        <p className="error">
          Nomination is allowed only for final year (BE) students.
        </p>
      </div>
    );
  }

  return (
  <div className="card">
    <h2 className="card-title">Student Self-Nomination</h2>

    {submitted && (
      <div className="status-box success">
        ✅ You have already submitted your nomination.
      </div>
    )}

    <form className="form-grid" onSubmit={handleSubmit}>
      <input type="number" step="0.01" name="cgpa"
        placeholder="CGPA"
        value={formData.cgpa}
        onChange={handleChange}
        disabled={submitted}
        required />

      <textarea name="majorProject" placeholder="Major Project"
        value={formData.majorProject}
        onChange={handleChange}
        disabled={submitted} />

      <textarea name="internshipDetails" placeholder="Internship Details"
        value={formData.internshipDetails}
        onChange={handleChange}
        disabled={submitted} />

      <textarea name="achievements" placeholder="Achievements"
        value={formData.achievements}
        onChange={handleChange}
        disabled={submitted} />

      <input name="leadershipRole" placeholder="Leadership Role"
        value={formData.leadershipRole}
        onChange={handleChange}
        disabled={submitted} />

      <input type="url" name="proofLink"
        placeholder="Proof Link"
        value={formData.proofLink}
        onChange={handleChange}
        disabled={submitted} />

      <button disabled={submitted}>
        {submitted ? "Already Submitted" : "Submit Nomination"}
      </button>
    </form>
  </div>
);
};

export default NominationForm;
