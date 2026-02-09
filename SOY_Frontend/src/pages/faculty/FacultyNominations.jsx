import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  Alert,
  CircularProgress,
} from "@mui/material";
import api from "../../services/api";

const FacultyNominations = () => {
  const [nominations, setNominations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNominations = async () => {
      try {
        const res = await api.get("/faculty/nominations");
        setNominations(res.data);
      } catch {
        setError("Unable to load nominations.");
      } finally {
        setLoading(false);
      }
    };

    fetchNominations();
  }, []);

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
        Student Nominations
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {nominations.length === 0 ? (
        <Alert severity="info">
          No nominations available.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {nominations.map((n) => (
            <Grid item xs={12} md={6} key={n.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {n.studentName}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Class: {n.studentClass}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    CGPA: {n.cgpa}
                  </Typography>

                  <Box sx={{ mt: 1 }}>
                    <Chip
                      label={n.status}
                      color={
                        n.status === "SHORTLISTED"
                          ? "success"
                          : n.status === "REJECTED"
                          ? "error"
                          : "default"
                      }
                      size="small"
                    />
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    {n.alreadyEvaluated ? (
                      <Chip
                        label="Evaluated"
                        color="success"
                        variant="outlined"
                      />
                    ) : (
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() =>
                          navigate(`/faculty/evaluate/${n.id}`)
                        }
                      >
                        Evaluate
                      </Button>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default FacultyNominations;
