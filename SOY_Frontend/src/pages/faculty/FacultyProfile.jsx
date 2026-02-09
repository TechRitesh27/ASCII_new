import { useEffect, useState } from "react";
import api from "../../services/api";

const FacultyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");
        setProfile(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Unable to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="page">Loading profile...</div>;
  }

  if (error) {
    return <div className="page error">{error}</div>;
  }

  return (
    <div className="profile-card">
      <h2>Faculty Profile</h2>

      <div className="profile-row">
        <span>College ID : </span>
        <strong>{profile.collegeId}</strong>
      </div>

      <div className="profile-row">
        <span>Full Name : </span>
        <strong>{profile.fullName}</strong>
      </div>

      <div className="profile-row">
        <span>Email : </span>
        <strong>{profile.email}</strong>
      </div>

      <div className="profile-row">
        <span>Department : </span>
        <strong>{profile.department || "-"}</strong>
      </div>

      <div className="profile-row">
        <span>Designation : </span>
        <strong>{profile.designation || "-"}</strong>
      </div>

      <div className="profile-row">
        <span>Role : </span>
        <strong>{profile.role}</strong>
      </div>

      <div
        className={`profile-status ${
          profile.active ? "active" : "inactive"
        }`}
      >
        {profile.active ? "Active Faculty Member" : "Account Disabled"}
      </div>
    </div>
  );
};

export default FacultyProfile;
