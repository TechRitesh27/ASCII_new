import { useEffect, useState } from "react";
import api from "../api/api";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");
        setProfile(res.data);
      } catch (err) {
        setError("Unable to load profile");
      }
    };

    fetchProfile();
  }, []);

  if (error) return <p className="error">{error}</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="profile-dashboard">
      <h2>👤 My Profile</h2>

      <div className="profile-card">
        <p><strong>Name:</strong> {profile.fullName}</p>
        <p><strong>College ID:</strong> {profile.collegeId}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Role:</strong> {profile.role}</p>

        {profile.studentClass && (
          <>
            <p><strong>Class:</strong> {profile.studentClass}</p>
            <p><strong>Division:</strong> {profile.division}</p>
            <p><strong>Roll No:</strong> {profile.rollNumber}</p>
            <p><strong>Contact:</strong> {profile.contactNumber}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
