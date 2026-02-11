import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
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

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [collegeId, setCollegeId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { collegeId, password });

      const cleanRole = res.data.role.replace("ROLE_", "");
      login(res.data.token, cleanRole);

      if (cleanRole === "STUDENT") navigate("/student");
      else if (cleanRole === "FACULTY") navigate("/faculty");
      else if (cleanRole === "ADMIN") navigate("/admin");
      else navigate("/");
    } catch (err) {
      if (err.response?.status === 401)
        setError("Invalid College ID or Password.");
      else if (err.response?.status === 403)
        setError("Your account is inactive.");
      else setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{ width: "100%", display: "flex", justifyContent: "center" }}
    >
      <Card
        sx={{
          width: 420,
          p: 4,
          backgroundColor: "rgba(30,41,59,0.9)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 0 60px rgba(37,99,235,0.25)",
          borderRadius: 4,
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            align="center"
            sx={{ fontWeight: 600, color: "#fff" }}
          >
            Welcome Back
          </Typography>

          <Typography
            align="center"
            variant="body2"
            sx={{ mb: 3, color: "#94a3b8" }}
          >
            Sign in to continue
          </Typography>

          <form onSubmit={handleLogin}>
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
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <VisibilityOff sx={{ color: "#94a3b8" }} />
                      ) : (
                        <Visibility sx={{ color: "#94a3b8" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Typography variant="body2" sx={{ textAlign: "right", mt: 1 }}>
              <Link
                to="/forgot-password"
                style={{ color: "#2563eb", textDecoration: "none" }}
              >
                Forgot Password?
              </Link>
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.3,
                fontWeight: 600,
                borderRadius: 3,
                boxShadow: "0 10px 30px rgba(37,99,235,0.4)",
                transition: "0.3s",
                "&:hover": { transform: "translateY(-3px)" },
              }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={22} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>

            <Divider sx={{ my: 3 }} />

            <Typography align="center" sx={{ color: "#cbd5e1" }}>
              Don’t have an account?{" "}
              <Link to="/register" style={{ color: "#2563eb" }}>
                Register
              </Link>
            </Typography>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Login;
