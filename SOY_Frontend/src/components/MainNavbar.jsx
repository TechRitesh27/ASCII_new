import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

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
    <AppBar position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

        {/* Left Side */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          ASCII – SOY
        </Typography>

        {/* Right Side */}
        <Box>

          <Button color="inherit" component={Link} to="/">
            Home
          </Button>

          {isAuthenticated && (
            <Button
              color="inherit"
              component={Link}
              to={getDashboardPath()}
            >
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
