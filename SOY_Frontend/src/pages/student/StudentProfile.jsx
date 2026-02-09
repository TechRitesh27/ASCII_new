import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
import api from "../../services/api";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= FETCH PROFILE ================= */

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile");
        setProfile(res.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Unable to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  /* ================= UI ================= */

  return (
    <Paper sx={{ p: 4, maxWidth: 700 }}>
      <Typography variant="h5" gutterBottom>
        Student Profile
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Stack spacing={2}>

        <ProfileRow label="College ID" value={profile.collegeId} />
        <ProfileRow label="Full Name" value={profile.fullName} />
        <ProfileRow label="Email" value={profile.email} />
        <ProfileRow label="Class" value={profile.studentClass} />
        <ProfileRow label="Division" value={profile.division} />
        <ProfileRow label="Roll Number" value={profile.rollNumber} />
        <ProfileRow label="Contact Number" value={profile.contactNumber} />

        <Box sx={{ mt: 2 }}>
          <Chip
            label={profile.active ? "Active Student" : "Account Disabled"}
            color={profile.active ? "success" : "error"}
            sx={{ fontWeight: "bold" }}
          />
        </Box>

      </Stack>
    </Paper>
  );
};

/* ================= REUSABLE ROW COMPONENT ================= */

const ProfileRow = ({ label, value }) => (
  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
    <Typography color="text.secondary">{label}</Typography>
    <Typography fontWeight="bold">
      {value || "-"}
    </Typography>
  </Box>
);

export default StudentProfile;
