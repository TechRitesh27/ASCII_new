import { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  Stack,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import api from "../../services/api";

const AdminControlPanel = () => {
  const [votingOpen, setVotingOpen] = useState(null); // null = loading state
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [confirmClose, setConfirmClose] = useState(false);

  /* ================= LOAD STATUS ================= */

  const fetchStatus = async () => {
    try {
      const res = await api.get("/admin/voting/status");
      setVotingOpen(res.data);
    } catch (err) {
      setError("Unable to fetch voting status.");
      setVotingOpen(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  /* ================= ACTION HANDLER ================= */

  const handleAction = async (endpoint, successMsg) => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await api.put(endpoint);
      await fetchStatus(); // ensure refresh before UI changes
      setMessage(successMsg);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Operation failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (votingOpen === null) {
    return <CircularProgress />;
  }

  return (
    <>
      <Paper sx={{ p: 4, maxWidth: 700 }}>
        <Typography variant="h5" gutterBottom>
          SOY System Controls
        </Typography>

        <Chip
          label={votingOpen ? "VOTING OPEN" : "VOTING CLOSED"}
          color={votingOpen ? "success" : "error"}
          sx={{ mb: 3, fontWeight: "bold" }}
        />

        <Stack spacing={2}>

          <Button
            variant="contained"
            disabled={loading}
            onClick={() =>
              handleAction(
                "/admin/shortlist/generate",
                "Shortlist generated successfully."
              )
            }
          >
            Generate Shortlist
          </Button>

          <Button
            variant="contained"
            color="success"
            disabled={loading || votingOpen === true}
            onClick={() =>
              handleAction(
                "/admin/voting/open",
                "Voting opened successfully."
              )
            }
          >
            Open Voting
          </Button>

          <Button
            variant="contained"
            color="error"
            disabled={loading || votingOpen === false}
            onClick={() => setConfirmClose(true)}
          >
            Close Voting
          </Button>

          {loading && <CircularProgress size={24} />}

          {message && <Alert severity="success">{message}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}

        </Stack>
      </Paper>

      <Dialog open={confirmClose} onClose={() => setConfirmClose(false)}>
        <DialogTitle>Confirm Close Voting</DialogTitle>
        <DialogContent>
          Are you sure you want to close voting?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmClose(false)}>
            Cancel
          </Button>
          <Button
            color="error"
            onClick={() => {
              setConfirmClose(false);
              handleAction(
                "/admin/voting/close",
                "Voting closed successfully."
              );
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminControlPanel;
