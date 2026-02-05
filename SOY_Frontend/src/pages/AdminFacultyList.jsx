import { useEffect, useState } from "react";
import api from "../api/api";

const AdminFacultyList = () => {
  const [faculty, setFaculty] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await api.get("/admin/faculty");
        setFaculty(res.data);
      } catch {
        setError("Unable to load faculty list");
      }
    };

    fetchFaculty();
  }, []);

  return (
    <div className="page">
      <h2>Faculty Management</h2>

      {error && <p className="error">{error}</p>}

      {faculty.length === 0 ? (
        <p>No faculty found</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>College ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {faculty.map((f) => (
              <tr key={f.collegeId}>
                <td>{f.collegeId}</td>
                <td>{f.fullName}</td>
                <td>{f.email}</td>
                <td>{f.contactNumber || "-"}</td>
                <td>
                  {f.active ? (
                    <span style={{ color: "green" }}>Active</span>
                  ) : (
                    <span style={{ color: "red" }}>Inactive</span>
                  )}
                </td>

                <td>
                  {f.firstLogin ? (
                    <span style={{ color: "orange" }}>Not Activated</span>
                  ) : (
                    <span style={{ color: "green" }}>Active</span>
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

export default AdminFacultyList;
