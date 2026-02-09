import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import api from "../../services/api";

const FacultyEvaluationHistory = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/faculty/evaluations/my");
        setEvaluations(res.data);
      } catch (err) {
        setError("Unable to load evaluation history");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        My Evaluation History
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      {evaluations.length === 0 ? (
        <Alert severity="info">
          No evaluations submitted yet.
        </Alert>
      ) : (
        <Card>
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nomination ID</TableCell>
                    <TableCell>Student Name</TableCell>
                    <TableCell>Total Score</TableCell>
                    <TableCell>Evaluation Date</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {evaluations.map((e) => (
                    <TableRow key={e.id}>
                      <TableCell>{e.nomination.id}</TableCell>

                      <TableCell>
                        {e.nomination.student.fullName}
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={`${e.totalScore} / 90`}
                          color="primary"
                        />
                      </TableCell>

                      <TableCell>
                        {new Date(e.evaluatedAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>

              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default FacultyEvaluationHistory;
