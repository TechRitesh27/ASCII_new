import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Fade,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import api from "../../services/api";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* ================= SEND OTP ================= */

  const handleSendOtp = async () => {
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/send-reset-otp", null, {
        params: { email },
      });

      setStep(2);
      setSuccess("OTP sent to your email.");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to send OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= RESET PASSWORD ================= */

  const handleResetPassword = async () => {
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/reset-password", {
        email,
        otp,
        newPassword,
      });

      setSuccess("Password changed successfully!");
      setTimeout(() => navigate("/login"), 2000);

    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid OTP or error occurred."
      );
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
        background:
          "linear-gradient(135deg, #0f172a 0%, #0b1a35 100%)",
      }}
    >
      <Fade in timeout={800}>
        <Card
          sx={{
            width: 450,
            p: 3,
            backgroundColor: "rgba(30,41,59,0.85)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 0 40px rgba(37,99,235,0.25)",
            borderRadius: 3,
          }}
        >
          <CardContent>

            <Typography
              variant="h4"
              align="center"
              sx={{ fontWeight: 600, color: "#fff" }}
              gutterBottom
            >
              Reset Password
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}

            {step === 1 && (
              <>
                <TextField
                  label="Enter Registered Email"
                  fullWidth
                  margin="normal"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 3 }}
                  onClick={handleSendOtp}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : (
                    "Send OTP"
                  )}
                </Button>
              </>
            )}

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

                <TextField
                  label="New Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  margin="normal"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
                            <VisibilityOff sx={{ color: "#94a3b8" }} />
                          ) : (
                            <Visibility sx={{ color: "#94a3b8" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 3 }}
                  onClick={handleResetPassword}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </>
            )}

            <Divider sx={{ my: 3 }} />

            <Typography align="center">
              <Link
                to="/login"
                style={{ color: "#94a3b8", textDecoration: "none" }}
              >
                ⬅ Back to Login
              </Link>
            </Typography>

          </CardContent>
        </Card>
      </Fade>
    </Box>
  );
};

export default ForgotPassword;
