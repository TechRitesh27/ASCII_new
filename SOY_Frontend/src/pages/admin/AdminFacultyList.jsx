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
  Switch,
  Chip,
} from "@mui/material";
import api from "../../services/api";

const AdminFacultyList = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= FETCH ================= */

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const res = await api.get("/admin/faculty");
      setFaculty(res.data);
    } catch (err) {
      setError("Unable to load faculty list");
    } finally {
      setLoading(false);
    }
  };

  /* ================= TOGGLE STATUS ================= */

  const toggleStatus = async (id, currentStatus) => {
    try {
      await api.put(`/admin/users/${id}/status?active=${!currentStatus}`);

      setFaculty((prev) =>
        prev.map((f) =>
          f.id === id ? { ...f, active: !currentStatus } : f
        )
      );
    } catch {
      alert("Failed to update status");
    }
  };

  /* ================= UI ================= */

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
        Faculty Management
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      {faculty.length === 0 ? (
        <Alert severity="info">
          No faculty members found.
        </Alert>
      ) : (
        <Card>
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>College ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Toggle</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {faculty.map((f) => (
                    <TableRow key={f.id}>
                      <TableCell>{f.collegeId}</TableCell>

                      <TableCell>{f.fullName}</TableCell>

                      <TableCell>{f.email}</TableCell>

                      <TableCell>{f.department}</TableCell>

                      <TableCell>
                        <Chip
                          label={f.active ? "Active" : "Inactive"}
                          color={f.active ? "success" : "error"}
                        />
                      </TableCell>

                      <TableCell>
                        <Switch
                          checked={f.active}
                          onChange={() =>
                            toggleStatus(f.id, f.active)
                          }
                          color="primary"
                        />
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

export default AdminFacultyList;
