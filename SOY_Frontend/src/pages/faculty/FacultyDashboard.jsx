import { Outlet, NavLink } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Toolbar,
  CssBaseline,
} from "@mui/material";

const drawerWidth = 240;

const FacultyDashboard = () => {
  const menuItems = [
    { label: "Student Nominations", path: "nominations" },
    { label: "My Evaluations", path: "evaluations/my" },
    { label: "My Profile", path: "profile" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#1e293b",
            color: "#fff",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Faculty Panel
          </Typography>

          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.path}
                component={NavLink}
                to={item.path}
                sx={{
                  color: "inherit",
                  "&.active": {
                    backgroundColor: "#334155",
                  },
                }}
              >
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          bgcolor: "#f5f7fa",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        {/* <Typography variant="h4" gutterBottom>
          Faculty Dashboard
        </Typography> */}

        <Outlet />
      </Box>
    </Box>
  );
};

export default FacultyDashboard;
