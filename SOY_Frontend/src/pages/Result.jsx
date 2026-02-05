import { useEffect, useState } from "react";
import api from "../api/api";

const Result = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await api.get("/results/winner");
        setResult(response.data);
      } catch (err) {
        if (err.response?.status === 403) {
          setError("You are not authorized to view the result");
        } else if (err.response?.status === 404) {
          setError("Result not declared yet");
        } else {
          setError("Unable to fetch result. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, []);

  if (loading) {
    return (
      <div className="page">
        <p>Loading result...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <h2>Result</h2>
        <p className="error">{error}</p>
      </div>
    );
  }

  return (
    <div className="page result-container">
      <h1>🏆 Best Student of the Year 🏆</h1>

      <div className="result-card">
        <h2>{result.studentName}</h2>
        <p>
          <strong>College ID:</strong> {result.collegeId}
        </p>

        <hr />

        <p>
          <strong>Faculty Score:</strong>{" "}
          {result.facultyScore} / 90
        </p>

        <p>
          <strong>Student Voting Score:</strong>{" "}
          {(result.votingScore ?? 0).toFixed(2)} / 10
        </p>

        <h3>
          Total Score: {(result.finalScore ?? 0).toFixed(2)} / 100
        </h3>
      </div>

      <p className="result-note">
        This result is calculated using a transparent, data-driven evaluation
        combining faculty assessment and student participation.
      </p>
    </div>
  );
};

export default Result;
