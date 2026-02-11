import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  Stack,
  Fade,
} from "@mui/material";
import { Link } from "react-router-dom";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SchoolIcon from "@mui/icons-material/School";
import CampaignIcon from "@mui/icons-material/Campaign";
import InsightsIcon from "@mui/icons-material/Insights";
import CodeIcon from "@mui/icons-material/Code";
import logo from "../assets/ascii-logo.png";
import NoticeSection from "../components/NoticeSection";


const Home = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#0f172a",
        color: "#e2e8f0",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* ================= HERO SECTION ================= */}
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          background:
            "linear-gradient(135deg, #0f172a 0%, #0b1a35 60%, #0f172a 100%)",
          pt: 12, // pushes below navbar
        }}
      >
        <Container>
          <Grid
            container
            spacing={6}
            alignItems="center"
            justifyContent="space-between"
          >
            {/* LEFT SIDE – TEXT */}
            <Grid item xs={12} md={6}>
              <Box>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    letterSpacing: 1,
                  }}
                >
                  ASCII Portal
                </Typography>

                <Typography variant="h6" sx={{ mt: 2, color: "#94a3b8" }}>
                  Computer Engineering Department
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mt: 3,
                    lineHeight: 1.8,
                    color: "#cbd5e1",
                    maxWidth: 520,
                  }}
                >
                  Official digital platform for student recognition, academic
                  evaluation, technical events, and structured excellence
                  systems under the ASCII association.
                </Typography>

                <Stack direction="row" spacing={3} sx={{ mt: 5 }}>
                  <Button
                    variant="contained"
                    component={Link}
                    to="/login"
                    sx={{
                      backgroundColor: "#2563eb",
                      px: 4,
                      py: 1.5,
                      fontWeight: 600,
                      borderRadius: 2,
                      boxShadow: "0 10px 25px rgba(37,99,235,0.4)",
                      "&:hover": {
                        backgroundColor: "#1d4ed8",
                      },
                    }}
                  >
                    Login
                  </Button>

                  <Button
                    variant="outlined"
                    component={Link}
                    to="/register"
                    sx={{
                      borderColor: "#d4af37",
                      color: "#d4af37",
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      "&:hover": {
                        borderColor: "#facc15",
                        backgroundColor: "rgba(212,175,55,0.08)",
                      },
                    }}
                  >
                    Get Started
                  </Button>
                </Stack>
              </Box>
            </Grid>

            {/* RIGHT SIDE – LOGO */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={logo}
                alt="ASCII Logo"
                sx={{
                  width: { xs: 220, md: 360 },
                  opacity: 0.9,
                  filter: "brightness(0) invert(1)",
                  transition: "0.4s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ================= ABOUT ASCII ================= */}
      <Container sx={{ py: 10 }}>
        <Typography variant="h4" sx={{ mb: 6, fontWeight: 600 }}>
          About ASCII
        </Typography>

        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <Typography
              variant="body1"
              sx={{ lineHeight: 1.8, color: "#cbd5e1" }}
            >
              ASCII is the official platform of the Computer Engineering
              department focused on structured evaluation, student recognition,
              event management, and academic excellence. Our mission is to
              create transparent systems that reward talent and encourage
              innovation.
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              {[
                { icon: <SchoolIcon />, text: "Academic Excellence" },
                { icon: <CodeIcon />, text: "Technical Innovation" },
                { icon: <CampaignIcon />, text: "Leadership & Activities" },
                { icon: <InsightsIcon />, text: "Structured Evaluation" },
              ].map((item, index) => (
                <Grid item xs={6} key={index}>
                  <Card
                    sx={{
                      backgroundColor: "#1e293b",
                      borderRadius: 3,
                    }}
                  >
                    <CardContent>
                      <Typography sx={{ color: "#2563eb", mb: 1 }}>
                        {item.icon}
                      </Typography>
                      <Typography variant="body2">{item.text}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>

      {/* ================ NOTICE SECTION =================== */}
      <NoticeSection />

      {/* ================= MODULES SECTION ================= */}
      <Container sx={{ py: 10 }}>
        <Typography variant="h4" sx={{ mb: 6, fontWeight: 600 }}>
          Platform Modules
        </Typography>

        <Grid container spacing={4}>
          {/* SOY Card - Highlighted */}
          <Grid item xs={12} md={3}>
            <Card
              sx={{
                backgroundColor: "#1e293b",
                border: "2px solid #d4af37",
                boxShadow: "0 0 25px rgba(212,175,55,0.2)",
                borderRadius: 3,
              }}
            >
              <CardContent>
                <EmojiEventsIcon sx={{ fontSize: 40, color: "#d4af37" }} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Student of the Year
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Flagship recognition platform combining faculty evaluation and
                  student voting.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {["Technical Events", "Announcements", "Evaluation System"].map(
            (module, index) => (
              <Grid item xs={12} md={3} key={index}>
                <Card
                  sx={{
                    backgroundColor: "#1e293b",
                    borderRadius: 3,
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">{module}</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Structured and transparent system built for academic
                      integrity and excellence.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ),
          )}
        </Grid>
      </Container>

      {/* ================= IMPACT SECTION ================= */}
      <Box
        sx={{
          backgroundColor: "#111827",
          py: 10,
        }}
      >
        <Container>
          <Grid container spacing={6} textAlign="center">
            {[
              { number: "300+", label: "Students" },
              { number: "20+", label: "Faculty" },
              { number: "10+", label: "Events" },
              // { number: "1", label: "Flagship Award" },
            ].map((item, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Typography
                  variant="h3"
                  sx={{ color: "#2563eb", fontWeight: 700 }}
                >
                  {item.number}
                </Typography>
                <Typography sx={{ color: "#94a3b8", mt: 1 }}>
                  {item.label}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ================= FOOTER ================= */}
      <Box
        sx={{
          py: 4,
          textAlign: "center",
          borderTop: "1px solid #1e293b",
          backgroundColor: "#0f172a",
        }}
      >
        <Typography variant="body2" sx={{ color: "#64748b" }}>
          © {new Date().getFullYear()} ASCII – Computer Engineering Department
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
