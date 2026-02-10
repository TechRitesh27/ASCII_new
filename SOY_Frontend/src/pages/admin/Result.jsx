import { useEffect, useState, useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Fade,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import api from "../../services/api";

const Result = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showCeremony, setShowCeremony] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [stage, setStage] = useState("ready");

  const timerRef = useRef(null);

  /* ================= FETCH RESULT ================= */

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await api.get("/results/winner");
        setResult(response.data);
      } catch {
        setError("Result not declared yet.");
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, []);

  /* ================= COUNTDOWN ================= */

  useEffect(() => {
    if (stage === "countdown") {
      if (countdown > 0) {
        timerRef.current = setTimeout(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);
      } else {
        setStage("reveal");
      }
    }

    return () => clearTimeout(timerRef.current);
  }, [countdown, stage]);

  /* ================= START CEREMONY ================= */

  const startCeremony = async () => {
    // Reset states
    setCountdown(5);
    setStage("countdown");
    setShowCeremony(true);

    // Enter fullscreen immediately (required by browser)
    const element = document.documentElement;

    try {
      if (element.requestFullscreen) {
        await element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    } catch (err) {
      console.log("Fullscreen failed:", err);
    }
  };

  /* ================= EXIT FULLSCREEN (OPTIONAL) ================= */

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setShowCeremony(false);
    setStage("ready");
  };

  /* ================= LOADING / ERROR ================= */

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

  /* ================= NORMAL ADMIN VIEW ================= */

  if (!showCeremony) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          🏆 Final Result
        </Typography>

        <Card sx={{ maxWidth: 600 }}>
          <CardContent>
            <Typography variant="h6">Winner: {result.studentName}</Typography>

            <Typography>
              Final Score: {result.finalScore.toFixed(2)} / 100
            </Typography>

            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={startCeremony}
            >
              🎬 Reveal Winner
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  /* ================= CEREMONY MODE ================= */

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        background: "radial-gradient(circle at center, #0f172a 0%, #000 90%)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        overflow: "hidden",
        zIndex: 9999,
      }}
    >
      {/* ===== MOVING LIGHT BEAMS ===== */}
      <Box className="light-beam left" />
      <Box className="light-beam right" />

      {/* ===== COUNTDOWN ===== */}
      {stage === "countdown" && (
        <>
          <Typography variant="h3" sx={{ letterSpacing: 3 }}>
            And The Winner Is...
          </Typography>

          <Typography
            sx={{
              fontSize: "200px",
              fontWeight: "bold",
              animation: "countdownZoom 1s ease-in-out",
            }}
          >
            {countdown}
          </Typography>
        </>
      )}

      {/* ===== REVEAL STAGE ===== */}
      {stage === "reveal" && (
        <Fade in timeout={1500}>
          <Box textAlign="center" sx={{ position: "relative" }}>
            {/* Flash Effect */}
            <Box className="flash-burst" />

            {/* Spotlight Circle */}
            <Box className="spotlight" />

            <Typography
              variant="h2"
              sx={{
                mb: 6,
                letterSpacing: 4,
                animation: "fadeInUp 1.2s ease",
              }}
            >
              BEST STUDENT OF THE YEAR
            </Typography>

            {/* Winner Card */}
            <Card
              sx={{
                p: 6,
                borderRadius: 4,
                background: "linear-gradient(135deg, #fff 0%, #f8f9fa 100%)",
                color: "#000",
                minWidth: 600,
                border: "4px solid gold",
                boxShadow: "0 0 80px rgba(255,215,0,0.8)",
                animation: "winnerReveal 1.5s ease",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  color: "#b8860b",
                  letterSpacing: 2,
                }}
              >
                {result.studentName}
              </Typography>

              <Typography sx={{ mt: 3 }} variant="h6">
                Final Score: {result.finalScore.toFixed(2)} / 100
              </Typography>
            </Card>

            <Button
              variant="outlined"
              sx={{ mt: 6, color: "#fff", borderColor: "#fff" }}
              onClick={exitFullscreen}
            >
              Exit Ceremony
            </Button>
          </Box>
        </Fade>
      )}

      {/* ===== STYLES ===== */}
      <style>
        {`
        /* Moving Light Beams */
        .light-beam {
          position: absolute;
          top: -20%;
          width: 40%;
          height: 150%;
          background: linear-gradient(
            60deg,
            rgba(255,255,255,0.08),
            transparent
          );
          transform: rotate(25deg);
          animation: moveLight 6s infinite alternate;
        }

        .light-beam.left {
          left: -10%;
        }

        .light-beam.right {
          right: -10%;
          transform: rotate(-25deg);
        }

        @keyframes moveLight {
          0% { transform: translateX(0) rotate(25deg); }
          100% { transform: translateX(80%) rotate(25deg); }
        }

        /* Countdown Zoom */
        @keyframes countdownZoom {
          0% { transform: scale(0.7); opacity: 0; }
          50% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(1); }
        }

        /* Fade Up */
        @keyframes fadeInUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* Winner Reveal */
        @keyframes winnerReveal {
          from { transform: scale(0.6); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        /* Flash Burst */
        .flash-burst {
          position: absolute;
          inset: 0;
          background: white;
          opacity: 0;
          animation: flash 0.8s ease-out;
          pointer-events: none;
        }

        @keyframes flash {
          0% { opacity: 0.9; }
          100% { opacity: 0; }
        }

        /* Spotlight */
        .spotlight {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(
            circle,
            rgba(255,215,0,0.25) 0%,
            transparent 70%
          );
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: spotlightPulse 3s infinite alternate;
          pointer-events: none;
        }

        @keyframes spotlightPulse {
          0% { transform: translate(-50%, -50%) scale(0.9); }
          100% { transform: translate(-50%, -50%) scale(1.1); }
        }
      `}
      </style>
    </Box>
  );
};

export default Result;
