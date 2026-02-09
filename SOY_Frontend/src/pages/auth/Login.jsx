import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";
import api from "../../services/api";
import { useAuth } from "../../auth/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [collegeId, setCollegeId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        collegeId,
        password,
      });

      const rawRole = res.data.role;
      const cleanRole = rawRole.replace("ROLE_", "");

      // Save token + role
      login(res.data.token, cleanRole);

      // Redirect by role
      if (cleanRole === "STUDENT") navigate("/student");
      else if (cleanRole === "FACULTY") navigate("/faculty");
      else if (cleanRole === "ADMIN") navigate("/admin");
      else navigate("/");

    } catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid College ID or Password.");
      } else if (err.response?.status === 403) {
        setError("Your account is inactive. Please contact Admin.");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
      }}
    >
      <Card sx={{ width: 420, p: 3 }}>
        <CardContent>

          <Typography variant="h4" align="center" gutterBottom>
            SOY Login
          </Typography>

          <Typography
            align="center"
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            Sign in to access your dashboard
          </Typography>

          <Box component="form" onSubmit={handleLogin}>

            <TextField
              label="College ID"
              fullWidth
              margin="normal"
              value={collegeId}
              onChange={(e) => setCollegeId(e.target.value)}
              required
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
                "Login"
              )}
            </Button>

            <Divider sx={{ my: 3 }} />

            {/* Register Link */}
            <Typography align="center" variant="body2">
              Don't have an account?{" "}
              <Link to="/register">Register here</Link>
            </Typography>

            {/* Back to Home */}
            <Typography align="center" variant="body2" sx={{ mt: 1 }}>
              <Link to="/">⬅ Back to Home</Link>
            </Typography>

          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
