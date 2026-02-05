import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

const FacultyEvaluation = () => {
  const { nominationId } = useParams();
  const navigate = useNavigate();

  const [scores, setScores] = useState({
    academicScore: "",
    projectScore: "",
    activityScore: "",
    leadershipScore: "",
    disciplineScore: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* ================= LOAD CHECK ================= */
  useEffect(() => {
    const checkAlreadyEvaluated = async () => {
      try {
        await api.get(`/faculty/evaluations/check/${nominationId}`);
        // If no error → not evaluated yet
      } catch (err) {
        if (err.response?.status === 409) {
          setSubmitted(true);
          setMessage("You have already evaluated this nomination.");
        }
      } finally {
        setLoading(false);
      }
    };

    checkAlreadyEvaluated();
  }, [nominationId]);

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    setScores({
      ...scores,
      [e.target.name]: e.target.value,
    });
  };

  const validateScores = () => {
    return (
      scores.academicScore <= 30 &&
      scores.projectScore <= 25 &&
      scores.activityScore <= 15 &&
      scores.leadershipScore <= 10 &&
      scores.disciplineScore <= 10
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!validateScores()) {
      setError("One or more scores exceed maximum allowed limits.");
      return;
    }

    try {
      await api.post(`/faculty/evaluations/${nominationId}`, scores);
      setSubmitted(true);
      setMessage("Evaluation submitted successfully.");
    } catch (err) {
      if (err.response?.status === 403) {
        setError("You are not authorized to evaluate.");
      } else if (err.response?.status === 409) {
        setSubmitted(true);
        setMessage("You have already evaluated this nomination.");
      } else {
        setError("Evaluation failed. Please try again.");
      }
    }
  };

  /* ================= UI ================= */

  if (loading) {
    return <p className="page">Loading evaluation form...</p>;
  }

  return (
    <div className="page">
      <h2>Faculty Evaluation</h2>

      <p style={{ fontSize: "14px", color: "#64748b" }}>
        Nomination ID: <strong>{nominationId}</strong>
      </p>

      <form className="form" onSubmit={handleSubmit}>

        <input
          type="number"
          name="academicScore"
          placeholder="Academic Score (Max 30)"
          value={scores.academicScore}
          onChange={handleChange}
          disabled={submitted}
          required
        />

        <input
          type="number"
          name="projectScore"
          placeholder="Project Score (Max 25)"
          value={scores.projectScore}
          onChange={handleChange}
          disabled={submitted}
          required
        />

        <input
          type="number"
          name="activityScore"
          placeholder="Activity Score (Max 15)"
          value={scores.activityScore}
          onChange={handleChange}
          disabled={submitted}
          required
        />

        <input
          type="number"
          name="leadershipScore"
          placeholder="Leadership Score (Max 10)"
          value={scores.leadershipScore}
          onChange={handleChange}
          disabled={submitted}
          required
        />

        <input
          type="number"
          name="disciplineScore"
          placeholder="Discipline Score (Max 10)"
          value={scores.disciplineScore}
          onChange={handleChange}
          disabled={submitted}
          required
        />

        <button type="submit" disabled={submitted}>
          {submitted ? "Evaluation Submitted" : "Submit Evaluation"}
        </button>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </form>

      <button
        style={{ marginTop: "15px" }}
        onClick={() => navigate("/faculty/nominations")}
      >
        Back to Nominations
      </button>
    </div>
  );
};

export default FacultyEvaluation;
