import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import logo from "../assets/ascii-logo.png";

const MainNavbar = () => {
  const { isAuthenticated, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getDashboardPath = () => {
    if (role === "STUDENT") return "/student";
    if (role === "FACULTY") return "/faculty";
    if (role === "ADMIN") return "/admin";
    return "/";
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#0f172a",
        borderBottom: "1px solid #1e293b",
      }}
      elevation={0}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* Left Side - Logo + Title */}
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="ASCII Logo"
            sx={{
              height: 40,
              filter: "brightness(0) invert(1)",
            }}
          />

          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            ASCII - COMP
          </Typography>
        </Box>

        {/* Right Side */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>

          {isAuthenticated && (
            <Button color="inherit" component={Link} to={getDashboardPath()}>
              Dashboard
            </Button>
          )}

          {!isAuthenticated ? (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/register">
                Register
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavbar;
