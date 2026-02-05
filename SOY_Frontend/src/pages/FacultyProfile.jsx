import { useEffect, useState } from "react";
import api from "../api/api";
import "./Profile.css";

const FacultyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");
        setProfile(res.data);
      } catch {
        setError("Unable to load profile");
      }
    };

    fetchProfile();
  }, []);

  if (error) return <p className="error">{error}</p>;
  if (!profile) return <p className="page">Loading profile...</p>;

  return (
    <div className="profile-card">
      <h2>Faculty Profile</h2>

      <div className="profile-row">
        <span>College ID</span>
        <strong>{profile.collegeId}</strong>
      </div>

      <div className="profile-row">
        <span>Name</span>
        <strong>{profile.fullName}</strong>
      </div>

      <div className="profile-row">
        <span>Email</span>
        <strong>{profile.email}</strong>
      </div>

      <div className="profile-row">
        <span>Role</span>
        <strong>{profile.role}</strong>
      </div>

      <div className="profile-badge">
        ACTIVE FACULTY MEMBER
      </div>
    </div>
  );
};

export default FacultyProfile;
