import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  Grid,
  Divider,
  Alert,
  CircularProgress,
  Chip,
  IconButton,
  Fade,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../../services/api";

const noticeTypes = [
  { value: "GENERAL", label: "General Notice" },
  { value: "VOTING", label: "Voting Notice" },
  { value: "PAYMENT", label: "Payment Notice" },
  { value: "EVENT", label: "Event Announcement" },
];

const AdminNotices = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    noticeType: "GENERAL",
    startDate: "",
    endDate: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchNotices = async () => {
    try {
      const res = await api.get("/notices/active");
      setNotices(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          data.append(key, formData[key]);
        }
      });

      if (imageFile) {
        data.append("image", imageFile);
      }

      await api.post("/notices", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Notice created successfully.");
      setFormData({
        title: "",
        description: "",
        noticeType: "GENERAL",
        startDate: "",
        endDate: "",
      });
      setImageFile(null);

      fetchNotices();
    } catch (err) {
      setError("Failed to create notice.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notices/${id}`);
      fetchNotices();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={wrapperStyle}>
      <Fade in timeout={600}>
        <Box sx={{ width: "100%", maxWidth: 1200 }}>

          <Typography variant="h4" sx={titleStyle}>
            Notice Management
          </Typography>

          <Grid container spacing={4}>

            {/* CREATE NOTICE */}
            <Grid item xs={12} md={5}>
              <Card sx={cardStyle}>
                <CardContent>

                  <Typography variant="h6" sx={{ color: "#fff" }}>
                    Create New Notice
                  </Typography>

                  <Divider sx={dividerStyle} />

                  {error && <Alert severity="error">{error}</Alert>}
                  {message && <Alert severity="success">{message}</Alert>}

                  <Box component="form" onSubmit={handleSubmit}>

                    <TextField
                      label="Title"
                      name="title"
                      fullWidth
                      margin="normal"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />

                    <TextField
                      label="Description"
                      name="description"
                      fullWidth
                      multiline
                      rows={4}
                      margin="normal"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />

                    <TextField
                      select
                      label="Notice Type"
                      name="noticeType"
                      fullWidth
                      margin="normal"
                      value={formData.noticeType}
                      onChange={handleChange}
                    >
                      {noticeTypes.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          {type.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      label="Start Date"
                      name="startDate"
                      type="datetime-local"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                      value={formData.startDate}
                      onChange={handleChange}
                    />

                    <TextField
                      label="End Date"
                      name="endDate"
                      type="datetime-local"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{ shrink: true }}
                      value={formData.endDate}
                      onChange={handleChange}
                    />

                    {/* FILE UPLOAD */}
                    <Button
                      variant="outlined"
                      component="label"
                      fullWidth
                      sx={{ mt: 2 }}
                    >
                      Upload Image (Optional)
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) =>
                          setImageFile(e.target.files[0])
                        }
                      />
                    </Button>

                    {imageFile && (
                      <Typography sx={{ mt: 1, color: "#94a3b8" }}>
                        {imageFile.name}
                      </Typography>
                    )}

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3 }}
                      disabled={loading}
                    >
                      {loading ? (
                        <CircularProgress size={24} />
                      ) : (
                        "Create Notice"
                      )}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* NOTICE LIST */}
            <Grid item xs={12} md={7}>
              <Card sx={cardStyle}>
                <CardContent>

                  <Typography variant="h6" sx={{ color: "#fff" }}>
                    Active Notices
                  </Typography>

                  <Divider sx={dividerStyle} />

                  {notices.map((notice) => (
                    <Box key={notice.id} sx={noticeCardStyle}>

                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography sx={{ fontWeight: 600 }}>
                          {notice.title}
                        </Typography>

                        <IconButton
                          onClick={() => handleDelete(notice.id)}
                          size="small"
                        >
                          <DeleteIcon sx={{ color: "#ef4444" }} />
                        </IconButton>
                      </Box>

                      <Typography sx={{ mt: 1, color: "#cbd5e1" }}>
                        {notice.description}
                      </Typography>

                      <Chip
                        label={notice.noticeType}
                        size="small"
                        sx={{
                          mt: 2,
                          backgroundColor: "#1e293b",
                          color: "#d4af37",
                        }}
                      />

                    </Box>
                  ))}

                </CardContent>
              </Card>
            </Grid>

          </Grid>
        </Box>
      </Fade>
    </Box>
  );
};

const wrapperStyle = {
  minHeight: "100vh",
  p: 4,
  background: "linear-gradient(135deg, #0f172a 0%, #0b1a35 100%)",
};

const cardStyle = {
  backgroundColor: "rgba(30,41,59,0.85)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 3,
  boxShadow: "0 0 30px rgba(212,175,55,0.15)",
};

const titleStyle = {
  mb: 4,
  color: "#fff",
  fontWeight: 600,
};

const dividerStyle = {
  my: 2,
  backgroundColor: "#334155",
};

const noticeCardStyle = {
  p: 2,
  mb: 2,
  borderRadius: 2,
  backgroundColor: "#1e293b",
};

export default AdminNotices;
