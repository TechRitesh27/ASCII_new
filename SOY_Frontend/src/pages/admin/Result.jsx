import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Divider,
  LinearProgress,
  Chip,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import api from "../../services/api";

const Result = () => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await api.get("/results/winner");
        setResult(response.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setError("Result not declared yet.");
        } else {
          setError("Unable to fetch result.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="info">{error}</Alert>;
  }

  const facultyPercent = (result.facultyScore / 90) * 100;
  const votingPercent = (result.votingScore / 10) * 100;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        <EmojiEventsIcon sx={{ mr: 1 }} />
        Best Student of the Year
      </Typography>

      <Card sx={{ maxWidth: 600, mt: 3 }}>
        <CardContent>

          <Typography variant="h5" gutterBottom>
            {result.studentName}
          </Typography>

          <Chip
            label={`College ID: ${result.collegeId}`}
            color="primary"
            sx={{ mb: 2 }}
          />

          <Divider sx={{ my: 2 }} />

          {/* Faculty Score */}
          <Typography variant="subtitle1">
            Faculty Evaluation (80%)
          </Typography>
          <LinearProgress
            variant="determinate"
            value={facultyPercent}
            sx={{ height: 8, borderRadius: 5, my: 1 }}
          />
          <Typography variant="body2">
            {result.facultyScore} / 90
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Voting Score */}
          <Typography variant="subtitle1">
            Student Voting (20%)
          </Typography>
          <LinearProgress
            variant="determinate"
            value={votingPercent}
            color="secondary"
            sx={{ height: 8, borderRadius: 5, my: 1 }}
          />
          <Typography variant="body2">
            {(result.votingScore ?? 0).toFixed(2)} / 10
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6">
            Final Score: {(result.finalScore ?? 0).toFixed(2)} / 100
          </Typography>

        </CardContent>
      </Card>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Final result is calculated using 80% faculty evaluation and
        20% student voting.
      </Typography>
    </Box>
  );
};

export default Result;
