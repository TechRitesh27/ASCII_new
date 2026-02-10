import { useEffect, useState, useMemo } from "react";
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
  TextField,
  TableSortLabel,
  TablePagination,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
} from "@mui/material";
import api from "../../services/api";

const AdminUsers = ({ role }) => {
  const isStudent = role === "STUDENT";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("collegeId");
  const [order, setOrder] = useState("asc");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    user: null,
  });

  /* ================= FETCH USERS ================= */

  useEffect(() => {
    fetchUsers();
  }, [role]);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const endpoint = isStudent ? "/admin/students" : "/admin/faculty";

      const res = await api.get(endpoint);
      setUsers(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load users.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= FILTER ================= */

  const filteredData = useMemo(() => {
    let data = users.filter((u) => {
      const searchLower = search.toLowerCase();

      return (
        u.fullName?.toLowerCase().includes(searchLower) ||
        u.collegeId?.toLowerCase().includes(searchLower) ||
        u.email?.toLowerCase().includes(searchLower) ||
        (isStudent &&
          (u.studentClass?.toLowerCase().includes(searchLower) ||
            u.division?.toLowerCase().includes(searchLower) ||
            String(u.rollNumber || "").includes(searchLower)))
      );
    });

    if (statusFilter === "ACTIVE") {
      data = data.filter((u) => u.active);
    } else if (statusFilter === "INACTIVE") {
      data = data.filter((u) => !u.active);
    }

    return data;
  }, [users, search, statusFilter, isStudent]);

  /* ================= SORT ================= */

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const valA = a[orderBy] ?? "";
      const valB = b[orderBy] ?? "";

      if (typeof valA === "number") {
        return order === "asc" ? valA - valB : valB - valA;
      }

      return order === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [filteredData, orderBy, order]);

  /* ================= PAGINATION ================= */

  useEffect(() => {
    setPage(0);
  }, [search, statusFilter]);

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  /* ================= TOGGLE STATUS ================= */

  const confirmToggle = (user) => {
    setConfirmDialog({ open: true, user });
  };

  const handleToggle = async () => {
    const user = confirmDialog.user;

    try {
      await api.put(`/admin/users/${user.id}/status`, null, {
        params: { active: !user.active },
      });

      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, active: !user.active } : u,
        ),
      );
    } catch {
      alert("Failed to update status");
    }

    setConfirmDialog({ open: false, user: null });
  };

  /* ================= CSV EXPORT ================= */

  const exportToCSV = () => {
    if (sortedData.length === 0) return;

    const headers = isStudent
      ? [
          "ID",
          "College ID",
          "Full Name",
          "Email",
          "Class",
          "Division",
          "Roll Number",
          "Status",
        ]
      : ["ID", "College ID", "Full Name", "Email", "Status"];

    const rows = sortedData.map((u) =>
      isStudent
        ? [
            u.id,
            u.collegeId,
            u.fullName,
            u.email,
            u.studentClass,
            u.division,
            u.rollNumber,
            u.active ? "Active" : "Inactive",
          ]
        : [
            u.id,
            u.collegeId,
            u.fullName,
            u.email,
            u.active ? "Active" : "Inactive",
          ],
    );

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = `${role.toLowerCase()}_management.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /* ================= STATS ================= */

  const total = users.length;
  const activeCount = users.filter((u) => u.active).length;
  const inactiveCount = total - activeCount;

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
        {isStudent ? "Student Management" : "Faculty Management"}
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      {/* ===== STATS CARDS ===== */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">{total}</Typography>
              <Typography variant="body2">Total</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card sx={{ backgroundColor: "#ecfdf5" }}>
            <CardContent>
              <Typography variant="h6">{activeCount}</Typography>
              <Typography variant="body2">Active</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card sx={{ backgroundColor: "#fef2f2" }}>
            <CardContent>
              <Typography variant="h6">{inactiveCount}</Typography>
              <Typography variant="body2">Inactive</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ===== SEARCH + FILTER + EXPORT ===== */}
      <Stack
        direction="row"
        spacing={2}
        sx={{ mb: 3 }}
        alignItems="center"
        justifyContent="space-between"
      >
        <TextField
          label="Search"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Box sx={{ display: "flex", gap: 1 }}>
          <Chip
            label="All"
            clickable
            color={statusFilter === "ALL" ? "primary" : "default"}
            onClick={() => setStatusFilter("ALL")}
          />
          <Chip
            label="Active"
            clickable
            color={statusFilter === "ACTIVE" ? "success" : "default"}
            onClick={() => setStatusFilter("ACTIVE")}
          />
          <Chip
            label="Inactive"
            clickable
            color={statusFilter === "INACTIVE" ? "error" : "default"}
            onClick={() => setStatusFilter("INACTIVE")}
          />
        </Box>

        <Button
          variant="outlined"
          onClick={exportToCSV}
          disabled={sortedData.length === 0}
        >
          Export CSV
        </Button>
      </Stack>

      {/* ===== TABLE ===== */}
      <Card>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {[
                    "collegeId",
                    "fullName",
                    "email",
                    ...(isStudent
                      ? ["studentClass", "division", "rollNumber"]
                      : []),
                  ].map((col) => (
                    <TableCell key={col}>
                      <TableSortLabel
                        active={orderBy === col}
                        direction={orderBy === col ? order : "asc"}
                        onClick={() => handleSort(col)}
                      >
                        {col.toUpperCase()}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                  <TableCell>Status</TableCell>
                  <TableCell>Toggle</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedData.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell>{u.collegeId}</TableCell>
                    <TableCell>{u.fullName}</TableCell>
                    <TableCell>{u.email}</TableCell>

                    {isStudent && (
                      <>
                        <TableCell>{u.studentClass}</TableCell>
                        <TableCell>{u.division}</TableCell>
                        <TableCell>{u.rollNumber}</TableCell>
                      </>
                    )}

                    <TableCell>
                      <Chip
                        label={u.active ? "Active" : "Inactive"}
                        color={u.active ? "success" : "error"}
                      />
                    </TableCell>

                    <TableCell>
                      <Switch
                        checked={u.active}
                        onChange={() => confirmToggle(u)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={sortedData.length}
            page={page}
            onPageChange={(e, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
          />
        </CardContent>
      </Card>

      {/* ===== CONFIRMATION DIALOG ===== */}
      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, user: null })}
      >
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          Are you sure you want to{" "}
          {confirmDialog.user?.active ? "disable" : "enable"} this account?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialog({ open: false, user: null })}>
            Cancel
          </Button>
          <Button color="error" onClick={handleToggle}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminUsers;
