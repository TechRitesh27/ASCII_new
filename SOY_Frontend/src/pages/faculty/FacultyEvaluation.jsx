import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress,
  Divider,
} from "@mui/material";
import api from "../../services/api";

const FacultyEvaluation = () => {
  const { nominationId } = useParams();
  const navigate = useNavigate();

  const [scores, setScores] = useState({
    academicScore: "",
    projectScore: "",
    activityScore: "",
    leadershipScore: "",
    disciplineScore: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* ================= SCORE LIMITS ================= */

  const limits = {
    academicScore: 30,
    projectScore: 25,
    activityScore: 15,
    leadershipScore: 10,
    disciplineScore: 10,
  };

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (value > limits[name]) return;

    setScores({
      ...scores,
      [name]: value,
    });
  };

  const calculateTotal = () => {
    return (
      Number(scores.academicScore || 0) +
      Number(scores.projectScore || 0) +
      Number(scores.activityScore || 0) +
      Number(scores.leadershipScore || 0) +
      Number(scores.disciplineScore || 0)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    setLoading(true);

    try {
      await api.post(`/faculty/evaluations/${nominationId}`, scores);

      setSubmitted(true);
      setMessage("Evaluation submitted successfully.");

    } catch (err) {
      if (err.response?.status === 409) {
        setSubmitted(true);
        setError("You have already evaluated this nomination.");
      } else if (err.response?.status === 403) {
        setError("You are not authorized.");
      } else {
        setError("Evaluation failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Faculty Evaluation
      </Typography>

      <Typography variant="body2" color="text.secondary" mb={2}>
        Nomination ID: {nominationId}
      </Typography>

      <Card>
        <CardContent>

          {message && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Academic Score (Max 30)"
                  type="number"
                  name="academicScore"
                  fullWidth
                  inputProps={{ max: 30 }}
                  value={scores.academicScore}
                  onChange={handleChange}
                  disabled={submitted}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Project Score (Max 25)"
                  type="number"
                  name="projectScore"
                  fullWidth
                  inputProps={{ max: 25 }}
                  value={scores.projectScore}
                  onChange={handleChange}
                  disabled={submitted}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Activity Score (Max 15)"
                  type="number"
                  name="activityScore"
                  fullWidth
                  inputProps={{ max: 15 }}
                  value={scores.activityScore}
                  onChange={handleChange}
                  disabled={submitted}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Leadership Score (Max 10)"
                  type="number"
                  name="leadershipScore"
                  fullWidth
                  inputProps={{ max: 10 }}
                  value={scores.leadershipScore}
                  onChange={handleChange}
                  disabled={submitted}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Discipline Score (Max 10)"
                  type="number"
                  name="disciplineScore"
                  fullWidth
                  inputProps={{ max: 10 }}
                  value={scores.disciplineScore}
                  onChange={handleChange}
                  disabled={submitted}
                  required
                />
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6">
                  Total Score: {calculateTotal()} / 90
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={submitted || loading}
                >
                  {loading
                    ? <CircularProgress size={20} />
                    : submitted
                    ? "Evaluation Submitted"
                    : "Submit Evaluation"}
                </Button>

                <Button
                  sx={{ ml: 2 }}
                  variant="outlined"
                  onClick={() => navigate("/faculty/nominations")}
                >
                  Back
                </Button>
              </Grid>

            </Grid>
          </form>

        </CardContent>
      </Card>
    </Box>
  );
};

export default FacultyEvaluation;
