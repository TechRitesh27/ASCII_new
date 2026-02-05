import { useEffect, useState } from "react";
import api from "../api/api";

const FacultyEvaluationHistory = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/faculty/evaluations/my");
        setEvaluations(res.data);
      } catch {
        setError("Unable to load evaluation history");
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="page">
      <h2>My Evaluation History</h2>

      {error && <p className="error">{error}</p>}

      {evaluations.length === 0 ? (
        <p>No evaluations submitted yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nomination ID</th>
              <th>Student</th>
              <th>Total Score</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {evaluations.map((e) => (
              <tr key={e.id}>
                <td>{e.nomination.id}</td>
                <td>{e.nomination.student.fullName}</td>
                <td>{e.totalScore} / 90</td>
                <td>{new Date(e.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FacultyEvaluationHistory;
