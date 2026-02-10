import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  MenuItem,
  Alert,
  CircularProgress,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
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

  const [showPassword, setShowPassword] = useState(false);
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

      const cleanRole = res.data.role.replace("ROLE_", "");
      login(res.data.token, cleanRole);
      navigate("/student");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ width: "100%", display: "flex", justifyContent: "center" }}
    >
      <Card
        sx={{
          width: 520,
          p: 4,
          backgroundColor: "rgba(30,41,59,0.9)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 0 60px rgba(212,175,55,0.25)",
          borderRadius: 4,
        }}
      >
        <CardContent>

          <Typography
            variant="h4"
            align="center"
            sx={{ fontWeight: 600, color: "#fff" }}
          >
            Create Account
          </Typography>

          <Typography
            align="center"
            variant="body2"
            sx={{ mb: 3, color: "#94a3b8" }}
          >
            Join the ASCII Portal
          </Typography>

          <form onSubmit={handleSubmit}>

            <TextField label="Full Name" name="fullName" fullWidth margin="normal" required onChange={handleChange} />

            <TextField select label="Select Class" name="studentClass" fullWidth margin="normal" required onChange={handleChange}>
              <MenuItem value="">Select Class</MenuItem>
              <MenuItem value="FE">FE</MenuItem>
              <MenuItem value="SE">SE</MenuItem>
              <MenuItem value="TE">TE</MenuItem>
              <MenuItem value="BE">BE</MenuItem>
            </TextField>

            <TextField label="Division" name="division" fullWidth margin="normal" required onChange={handleChange} />

            <TextField label="Roll Number" name="rollNumber" type="number" fullWidth margin="normal" required onChange={handleChange} />

            <TextField label="Contact Number" name="contactNumber" fullWidth margin="normal" required onChange={handleChange} />

            <TextField label="Email" name="email" type="email" fullWidth margin="normal" required onChange={handleChange} />

            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              required
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff sx={{ color: "#94a3b8" }} /> : <Visibility sx={{ color: "#94a3b8" }} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.3,
                fontWeight: 600,
                borderRadius: 3,
                boxShadow: "0 10px 30px rgba(212,175,55,0.35)",
                "&:hover": { transform: "translateY(-3px)" },
              }}
              disabled={loading}
            >
              {loading ? <CircularProgress size={22} color="inherit" /> : "Register"}
            </Button>

            <Divider sx={{ my: 3 }} />

            <Typography align="center" sx={{ color: "#cbd5e1" }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#2563eb" }}>
                Login
              </Link>
            </Typography>

          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Register;
