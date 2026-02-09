import { useEffect, useState } from "react";
import api from "../../services/api";

const AdminUsers = ({ role }) => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await api.get(`/admin/users/${role}`);
      setUsers(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load users."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [role]);

  const toggleStatus = async (id, active) => {
    const confirmAction = window.confirm(
      `Are you sure you want to ${
        active ? "disable" : "enable"
      } this user?`
    );

    if (!confirmAction) return;

    try {
      await api.put(`/admin/users/${id}/status`, null, {
        params: { active: !active },
      });

      loadUsers();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update user status."
      );
    }
  };

  if (loading) {
    return <div className="page">Loading users...</div>;
  }

  return (
    <div className="page">
      <h2>{role} Management</h2>

      {error && <p className="error">{error}</p>}

      {users.length === 0 ? (
        <p>No {role.toLowerCase()} users found.</p>
      ) : (
        <table className="table">
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
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.collegeId}</td>
                <td>{u.fullName}</td>
                <td>{u.email}</td>
                <td>
                  <span
                    style={{
                      color: u.active ? "green" : "red",
                      fontWeight: "600",
                    }}
                  >
                    {u.active ? "Active" : "Disabled"}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => toggleStatus(u.id, u.active)}
                    style={{
                      backgroundColor: u.active
                        ? "#dc2626"
                        : "#16a34a",
                      color: "#fff",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    {u.active ? "Disable" : "Enable"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsers;
