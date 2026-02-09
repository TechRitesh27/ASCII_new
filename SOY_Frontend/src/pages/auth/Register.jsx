import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  MenuItem,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";
import api from "../../services/api";
import { useAuth } from "../../auth/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    studentClass: "",
    division: "",
    rollNumber: "",
    contactNumber: "",
    email: "",
    password: "",
  });

  const [collegeId, setCollegeId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/register", formData);

      login(res.data.token, res.data.role);
      setCollegeId(res.data.collegeId);

    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  /* SUCCESS SCREEN */
  if (collegeId) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card sx={{ width: 450, p: 3, textAlign: "center" }}>
          <CardContent>
            <Typography variant="h4" gutterBottom color="primary">
              🎉 Registration Successful
            </Typography>

            <Typography sx={{ mb: 2 }}>
              Please save your College ID carefully:
            </Typography>

            <Box
              sx={{
                p: 2,
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              {collegeId}
            </Box>

            <Button
              variant="contained"
              sx={{ mt: 3 }}
              onClick={() => navigate("/student")}
            >
              Go to Dashboard
            </Button>

            <Typography sx={{ mt: 2 }}>
              <Link to="/">⬅ Back to Home</Link>
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  /* FORM */
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card sx={{ width: 500, p: 3 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Student Registration
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              name="fullName"
              fullWidth
              margin="normal"
              required
              onChange={handleChange}
            />

            <TextField
              select
              label="Select Class"
              name="studentClass"
              fullWidth
              margin="normal"
              required
              onChange={handleChange}
            >
              <MenuItem value="">Select Class</MenuItem>
              <MenuItem value="FE">FE</MenuItem>
              <MenuItem value="SE">SE</MenuItem>
              <MenuItem value="TE">TE</MenuItem>
              <MenuItem value="BE">BE</MenuItem>
            </TextField>

            <TextField
              label="Division"
              name="division"
              fullWidth
              margin="normal"
              required
              onChange={handleChange}
            />

            <TextField
              label="Roll Number"
              name="rollNumber"
              type="number"
              fullWidth
              margin="normal"
              required
              onChange={handleChange}
            />

            <TextField
              label="Contact Number"
              name="contactNumber"
              fullWidth
              margin="normal"
              required
              onChange={handleChange}
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              required
              onChange={handleChange}
            />

            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              required
              onChange={handleChange}
            />

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 3 }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Register"
              )}
            </Button>

            <Divider sx={{ my: 3 }} />

            <Typography align="center" variant="body2">
              Already have an account?{" "}
              <Link to="/login">Login here</Link>
            </Typography>

            <Typography align="center" variant="body2" sx={{ mt: 1 }}>
              <Link to="/">⬅ Back to Home</Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
