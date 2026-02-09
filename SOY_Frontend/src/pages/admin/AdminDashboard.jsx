import { Outlet, NavLink } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

const drawerWidth = 240;

const AdminDashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            mt: 8,
            backgroundColor: "#1e293b",
            color: "#fff",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Admin Menu
          </Typography>
        </Box>

        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.2)" }} />

        <List>

          {[
            { label: "System Control", path: "control" },
            { label: "Final Result", path: "result" },
            { label: "Add Faculty", path: "faculty/add" },
            { label: "View Faculties", path: "faculty/list" },
            { label: "Manage Students", path: "students" },
            { label: "Manage Faculty", path: "faculties" },
          ].map((item) => (
            <ListItemButton
              key={item.path}
              component={NavLink}
              to={item.path}
              sx={{
                "&.active": {
                  backgroundColor: "#334155",
                },
                "&:hover": {
                  backgroundColor: "#334155",
                },
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}

        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 5,
          mt: 8,
          backgroundColor: "#f1f5f9",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 3 }}>
          Admin Dashboard
        </Typography>

        <Outlet />
      </Box>

    </Box>
  );
};

export default AdminDashboard;
