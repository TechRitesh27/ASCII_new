import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Fade,
  CircularProgress,
} from "@mui/material";
import api from "../services/api";

const NoticeSection = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await api.get("/notices/active");
      setNotices(res.data);
    } catch (err) {
      console.error("Failed to fetch notices");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (notices.length === 0) return null;

  return (
    <Box sx={wrapperStyle}>
      <Typography variant="h4" sx={titleStyle}>
        Latest Announcements
      </Typography>

      <Box sx={gridStyle}>
        {notices.map((notice, index) => (
          <Fade in timeout={800 + index * 200} key={notice.id}>
            <Card sx={cardStyle}>

              {/* ✅ IMAGE SECTION (AUTO FIT) */}
              {notice.imagePath && (
                <Box sx={imageContainerStyle}>
                  <Box
                    component="img"
                    src={`http://localhost:8080/uploads/notices/${notice.imagePath}`}
                    alt={notice.title}
                    sx={imageStyle}
                  />
                </Box>
              )}

              <CardContent>
                <Typography sx={noticeTitle}>
                  {notice.title}
                </Typography>

                <Typography sx={noticeDesc}>
                  {notice.description}
                </Typography>

                <Chip
                  label={notice.noticeType}
                  size="small"
                  sx={chipStyle}
                />
              </CardContent>

            </Card>
          </Fade>
        ))}
      </Box>
    </Box>
  );
};

/* ================= STYLES ================= */

const wrapperStyle = {
  py: 10,
  px: 4,
  background: "linear-gradient(180deg, #0b1a35 0%, #0f172a 100%)",
};

const titleStyle = {
  textAlign: "center",
  mb: 6,
  fontWeight: 600,
  color: "#fff",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: 3,
  maxWidth: 1200,
  margin: "0 auto",
};

const cardStyle = {
  backgroundColor: "rgba(30,41,59,0.9)",
  backdropFilter: "blur(8px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: 3,
  boxShadow: "0 0 25px rgba(212,175,55,0.1)",
  overflow: "hidden",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 0 35px rgba(212,175,55,0.25)",
  },
};

/* 🔥 Image container */
const imageContainerStyle = {
  width: "100%",
  height: 220,
  backgroundColor: "#0f172a",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
};

/* 🔥 Image auto fit */
const imageStyle = {
  maxWidth: "100%",
  maxHeight: "100%",
  objectFit: "contain",   // keeps full image visible
};

const noticeTitle = {
  fontWeight: 600,
  color: "#d4af37",
  mb: 1,
};

const noticeDesc = {
  color: "#cbd5e1",
  mb: 2,
};

const chipStyle = {
  backgroundColor: "#1e293b",
  color: "#22c55e",
};

export default NoticeSection;
