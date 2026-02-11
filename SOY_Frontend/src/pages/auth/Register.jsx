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
  Fade,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import api from "../../services/api";
import { useAuth } from "../../auth/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [step, setStep] = useState(1); // 1=email, 2=otp, 3=form
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    studentClass: "",
    division: "",
    rollNumber: "",
    contactNumber: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [collegeId, setCollegeId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= SAFE ERROR HANDLER ================= */

  const extractError = (err, fallback) => {
    return (
      err.response?.data?.message ||
      err.response?.data?.error ||
      (typeof err.response?.data === "string"
        ? err.response?.data
        : null) ||
      fallback
    );
  };

  /* ================= SEND OTP ================= */

  const handleSendOtp = async () => {
    if (!email) {
      setError("Please enter email.");
      return;
    }

    setError("");
    setMessage("");
    setLoading(true);

    try {
      await api.post("/auth/send-registration-otp", null, {
        params: { email },
      });

      setMessage("OTP sent to your email.");
      setStep(2);
    } catch (err) {
      setError(extractError(err, "Failed to send OTP."));
    } finally {
      setLoading(false);
    }
  };

  /* ================= VERIFY OTP ================= */

  const handleVerifyOtp = async () => {
    if (!otp) {
      setError("Please enter OTP.");
      return;
    }

    setError("");
    setMessage("");
    setLoading(true);

    try {
      await api.post("/auth/verify-registration-otp", null, {
        params: { email, otp },
      });

      setMessage("Email verified successfully!");
      setStep(3);
    } catch (err) {
      setError(extractError(err, "Invalid OTP."));
    } finally {
      setLoading(false);
    }
  };

  /* ================= HANDLE FORM ================= */

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/register", {
        ...formData,
        email,
      });

      const cleanRole = res.data.role.replace("ROLE_", "");
      login(res.data.token, cleanRole);
      setCollegeId(res.data.collegeId);
    } catch (err) {
      setError(extractError(err, "Registration failed."));
    } finally {
      setLoading(false);
    }
  };

  /* ================= SUCCESS SCREEN ================= */

  if (collegeId) {
    return (
      <Box sx={wrapperStyle}>
        <Card sx={cardStyle}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h4" sx={{ color: "#22c55e" }}>
              🎉 Registration Successful
            </Typography>

            <Typography sx={{ mt: 2 }}>
              Your College ID:
            </Typography>

            <Typography sx={{ fontWeight: "bold", color: "#d4af37", mt: 1 }}>
              {collegeId}
            </Typography>

            <Button
              variant="contained"
              sx={{ mt: 3 }}
              onClick={() => navigate("/student")}
            >
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  /* ================= MAIN UI ================= */

  return (
    <Box sx={wrapperStyle}>
      <Fade in timeout={600}>
        <Card sx={cardStyle}>
          <CardContent>

            <Typography variant="h4" align="center" sx={{ color: "#fff" }}>
              Create Account
            </Typography>

            <Divider sx={{ my: 3, backgroundColor: "#334155" }} />

            {error && <Alert severity="error">{error}</Alert>}
            {message && <Alert severity="success">{message}</Alert>}

            {/* STEP 1 – EMAIL */}
            {step === 1 && (
              <>
                <TextField
                  label="Enter Email"
                  type="email"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={handleSendOtp}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : "Send OTP"}
                </Button>
              </>
            )}

            {/* STEP 2 – OTP */}
            {step === 2 && (
              <>
                <TextField
                  label="Enter OTP"
                  fullWidth
                  margin="normal"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />

                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={handleVerifyOtp}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : "Verify OTP"}
                </Button>
              </>
            )}

            {/* STEP 3 – FULL FORM */}
            {step === 3 && (
              <Box component="form" onSubmit={handleRegister}>
                <TextField
                  label="Full Name"
                  name="fullName"
                  fullWidth
                  margin="normal"
                  onChange={handleChange}
                  required
                />

                <TextField
                  select
                  label="Select Class"
                  name="studentClass"
                  fullWidth
                  margin="normal"
                  onChange={handleChange}
                  required
                >
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
                  onChange={handleChange}
                  required
                />

                <TextField
                  label="Roll Number"
                  name="rollNumber"
                  type="number"
                  fullWidth
                  margin="normal"
                  onChange={handleChange}
                  required
                />

                <TextField
                  label="Contact Number"
                  name="contactNumber"
                  fullWidth
                  margin="normal"
                  onChange={handleChange}
                  required
                />

                <TextField
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  margin="normal"
                  onChange={handleChange}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowPassword(!showPassword)
                          }
                        >
                          {showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3 }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : "Register"}
                </Button>
              </Box>
            )}

            <Divider sx={{ my: 3, backgroundColor: "#334155" }} />

            <Typography align="center" sx={{ color: "#cbd5e1" }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#2563eb" }}>
                Login
              </Link>
            </Typography>

          </CardContent>
        </Card>
      </Fade>
    </Box>
  );
};

/* ================= STYLES ================= */

const wrapperStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #0f172a 0%, #0b1a35 100%)",
};

const cardStyle = {
  width: 520,
  p: 3,
  backgroundColor: "rgba(30,41,59,0.85)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.1)",
  boxShadow: "0 0 40px rgba(212,175,55,0.2)",
  borderRadius: 3,
};

export default Register;
