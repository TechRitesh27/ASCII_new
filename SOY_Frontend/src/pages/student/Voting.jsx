import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Alert,
  CircularProgress,
  Chip,
} from "@mui/material";
import api from "../../services/api";

const Voting = () => {
  const [candidates, setCandidates] = useState([]);
  const [voted, setVoted] = useState(false);
  const [votingOpen, setVotingOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  /* ================= LOAD DATA ================= */

  useEffect(() => {
    const loadVotingData = async () => {
      try {
        const [phaseRes, candidatesRes, statusRes] = await Promise.all([
          api.get("/voting/status"),
          api.get("/votes/candidates"),
          api.get("/votes/status"),
        ]);

        setVotingOpen(phaseRes.data);
        setCandidates(candidatesRes.data);
        setVoted(statusRes.data);

        if (!phaseRes.data) {
          setError("Voting is currently closed by Admin.");
        }

      } catch (err) {
        setError("Unable to load voting data.");
      } finally {
        setLoading(false);
      }
    };

    loadVotingData();
  }, []);

  /* ================= HANDLE VOTE ================= */

  const handleVote = async (nominationId) => {
    if (voted || !votingOpen) return;

    setError("");
    setMessage("");

    try {
      await api.post(`/votes/${nominationId}`);
      setVoted(true);
      setMessage("Your vote has been submitted successfully!");
    } catch (err) {
      if (err.response?.status === 409) {
        setVoted(true);
        setError("You have already voted.");
      } else if (err.response?.status === 403) {
        setError("Voting is currently closed.");
      } else {
        setError("Voting failed. Please try again.");
      }
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
    <Box>
      <Typography variant="h5" gutterBottom>
        Student Voting
      </Typography>

      {/* Voting Status Badge */}
      <Box sx={{ mb: 2 }}>
        <Chip
          label={votingOpen ? "Voting Open" : "Voting Closed"}
          color={votingOpen ? "success" : "error"}
        />
      </Box>

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

      {/* If Voting Closed */}
      {!votingOpen && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Voting is currently closed. Please contact Admin.
        </Alert>
      )}

      {candidates.length === 0 ? (
        <Alert severity="info">
          No shortlisted candidates available for voting.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {candidates.map((c) => (
            <Grid item xs={12} md={6} key={c.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {c.student.fullName}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Class: {c.student.studentClass}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    CGPA: {c.cgpa}
                  </Typography>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                    disabled={voted || !votingOpen}
                    onClick={() => handleVote(c.id)}
                  >
                    {!votingOpen
                      ? "Voting Closed"
                      : voted
                      ? "Vote Submitted"
                      : "Vote"}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Typography sx={{ mt: 3, fontSize: 14 }} color="text.secondary">
        ⚠️ Each student can vote only once. Voting is final and anonymous.
      </Typography>
    </Box>
  );
};

export default Voting;
