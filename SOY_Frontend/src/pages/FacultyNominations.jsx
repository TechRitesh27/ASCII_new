import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

const FacultyNominations = () => {
  const [nominations, setNominations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNominations = async () => {
      try {
        const res = await api.get("/faculty/nominations");
        setNominations(res.data);
      } catch {
        setError("Unable to load nominations");
      }
    };

    fetchNominations();
  }, []);

  return (
    <div className="page">
      <h2>Student Nominations</h2>

      {error && <p className="error">{error}</p>}

      {nominations.length === 0 ? (
        <p>No nominations found</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>CGPA</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {nominations.map((n) => (
              <tr key={n.id}>
                <td>{n.id}</td>
                <td>{n.studentName}</td>
                <td>{n.studentClass}</td>
                <td>{n.cgpa}</td>
                <td>{n.status}</td>
                <td>
                  {n.alreadyEvaluated ? (
                    <span style={{ color: "green", fontWeight: "600" }}>
                      ✔ Evaluated
                    </span>
                  ) : (
                    <Link
                      to={`/faculty/evaluate/${n.id}`}
                      className="btn-link"
                    >
                      Evaluate
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FacultyNominations;
