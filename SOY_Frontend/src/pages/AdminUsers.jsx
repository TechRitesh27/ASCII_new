import { useEffect, useState } from "react";
import api from "../api/api";

const AdminUsers = ({ role }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const loadUsers = async () => {
    try {
      const res = await api.get(`/admin/users/${role}`);
      setUsers(res.data);
    } catch {
      setError("Unable to load users");
    }
  };

  useEffect(() => {
    loadUsers();
  }, [role]);

  const toggleStatus = async (id, active) => {
    try {
      await api.put(`/admin/users/${id}/status?active=${!active}`);
      loadUsers();
    } catch {
      alert("Failed to update status");
    }
  };

  return (
    <div className="page">
      <h2>{role} List</h2>

      {error && <p className="error">{error}</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>College ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.collegeId}</td>
              <td>{u.fullName}</td>
              <td>{u.email}</td>
              <td>
                {u.active ? "Active" : "Disabled"}
              </td>
              <td>
                <button
                  onClick={() => toggleStatus(u.id, u.active)}
                  style={{
                    background: u.active ? "#dc2626" : "#16a34a",
                    color: "#fff",
                  }}
                >
                  {u.active ? "Disable" : "Enable"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
