import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Grid,
  CircularProgress,
  Divider,
} from "@mui/material";
import api from "../../services/api";

const AddFaculty = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    department: "",
    designation: "",
    contactNumber: "",
  });

  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResponseData(null);
    setLoading(true);

    try {
      const res = await api.post("/admin/faculty/add", form);
      setResponseData(res.data);

      setForm({
        fullName: "",
        email: "",
        department: "",
        designation: "",
        contactNumber: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to add faculty. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Add New Faculty
      </Typography>

      <Card>
        <CardContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {responseData && (
            <Alert
              severity={responseData.emailSent ? "success" : "warning"}
              sx={{ mb: 2 }}
            >
              <strong>Faculty created successfully.</strong>
              <br />
              College ID: {responseData.collegeId}
              <br />
              {responseData.emailSent
                ? "Temporary password has been sent to the registered email."
                : "⚠️ Email delivery failed. Contact system administrator."}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Full Name"
                  name="fullName"
                  fullWidth
                  required
                  value={form.fullName}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Email"
                  type="email"
                  name="email"
                  fullWidth
                  required
                  value={form.email}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Department"
                  name="department"
                  fullWidth
                  required
                  value={form.department}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Designation"
                  name="designation"
                  fullWidth
                  required
                  value={form.designation}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Contact Number"
                  name="contactNumber"
                  fullWidth
                  required
                  value={form.contactNumber}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Button variant="contained" type="submit" disabled={loading}>
                  {loading ? <CircularProgress size={20} /> : "Add Faculty"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddFaculty;
