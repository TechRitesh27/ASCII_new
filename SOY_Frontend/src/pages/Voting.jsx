import { useEffect, useState } from "react";
import api from "../api/api";
import "./Voting.css"; // optional but recommended

const Voting = () => {
  const [candidates, setCandidates] = useState([]);
  const [voted, setVoted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // 🔹 Load candidates + vote status on page load
  useEffect(() => {
    const loadVotingData = async () => {
      try {
        const [candidatesRes, statusRes] = await Promise.all([
          api.get("/votes/candidates"),
          api.get("/votes/status"),
        ]);

        setCandidates(candidatesRes.data);
        setVoted(statusRes.data); // true / false from backend
      } catch (err) {
        setError("Unable to load voting data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadVotingData();
  }, []);

  // 🔹 Cast vote
  const handleVote = async (nominationId) => {
    if (voted) return;

    setError("");
    setMessage("");

    try {
      await api.post(`/votes/${nominationId}`);
      setVoted(true);
      setMessage("✅ Your vote has been submitted successfully!");
    } catch (err) {
      if (err.response?.status === 409 || err.response?.status === 403) {
        setVoted(true);
        setError("You have already voted.");
      } else {
        setError("Voting failed. Please try again.");
      }
    }
  };

  // 🔹 Loading state
  if (loading) {
    return <p className="page">Loading voting candidates...</p>;
  }

  return (
    <div className="page voting-page">
      <h2>🗳️ Student Voting</h2>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      {candidates.length === 0 ? (
        <p>No candidates available for voting.</p>
      ) : (
        <table className="voting-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>CGPA</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {candidates.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.student.fullName}</td>
                <td>{c.student.studentClass}</td>
                <td>{c.cgpa}</td>
                <td>
                  <button
                    className={voted ? "btn-disabled" : "btn-primary"}
                    disabled={voted}
                    onClick={() => handleVote(c.id)}
                  >
                    {voted ? "Vote Submitted" : "Vote"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p className="note">
        ⚠️ Each student can vote only once. Voting is final and anonymous.
      </p>
    </div>
  );
};

export default Voting;
