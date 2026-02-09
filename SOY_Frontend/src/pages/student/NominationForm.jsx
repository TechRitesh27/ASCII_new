import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import api from "../../services/api";

const NominationForm = () => {
  const [formData, setFormData] = useState({
    cgpa: "",
    majorProject: "",
    internshipDetails: "",
    achievements: "",
    leadershipRole: "",
    proofLink: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* ================= INITIAL CHECK ================= */

  useEffect(() => {
    const checkNomination = async () => {
      try {
        const res = await api.get("/nominations/my");

        setSubmitted(true);
        setStatus(res.data.status);
        setMessage("You have already submitted your nomination.");
      } catch (err) {
        if (err.response?.status !== 404) {
          setError("Unable to check nomination status.");
        }
      } finally {
        setLoading(false);
      }
    };

    checkNomination();
  }, []);

  /* ================= HANDLERS ================= */

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/nominations/submit", formData);
      setSubmitted(true);
      setStatus("SUBMITTED");
      setMessage("Nomination submitted successfully!");
    } catch (err) {
      setError(err.response?.data?.message || "Submission failed.");
    }
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  /* ================= UI ================= */

  return (
    <Box sx={{ maxWidth: 700, mx: "auto" }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Student Self-Nomination
          </Typography>

          {submitted && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {message}
              {status && (
                <>
                  <br />
                  Current Status: <strong>{status}</strong>
                </>
              )}
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {!submitted && (
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                label="CGPA"
                name="cgpa"
                type="number"
                inputProps={{ step: "0.01", min: 0, max: 10 }}
                fullWidth
                margin="normal"
                required
                onChange={handleChange}
              />

              <TextField
                label="Major Project"
                name="majorProject"
                multiline
                rows={3}
                fullWidth
                margin="normal"
                onChange={handleChange}
              />

              <TextField
                label="Internship Details"
                name="internshipDetails"
                multiline
                rows={3}
                fullWidth
                margin="normal"
                onChange={handleChange}
              />

              <TextField
                label="Achievements"
                name="achievements"
                multiline
                rows={3}
                fullWidth
                margin="normal"
                onChange={handleChange}
              />

              <TextField
                label="Leadership Role"
                name="leadershipRole"
                fullWidth
                margin="normal"
                onChange={handleChange}
              />

              <TextField
                label="Proof Link"
                name="proofLink"
                type="url"
                fullWidth
                margin="normal"
                onChange={handleChange}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3 }}
              >
                Submit Nomination
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default NominationForm;
