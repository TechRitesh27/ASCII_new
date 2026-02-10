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

const drawerWidth = 250;

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
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Admin Panel
          </Typography>
        </Box>

        <Divider sx={{ backgroundColor: "rgba(255,255,255,0.2)" }} />

        <List>

          {/* SYSTEM */}
          <Typography sx={{ px: 3, pt: 2, pb: 1, fontSize: 13, opacity: 0.7 }}>
            SYSTEM
          </Typography>

          <ListItemButton
            component={NavLink}
            to="control"
            sx={{
              "&.active": { backgroundColor: "#334155" },
              "&:hover": { backgroundColor: "#334155" },
            }}
          >
            <ListItemText primary="System Control" />
          </ListItemButton>

          <ListItemButton
            component={NavLink}
            to="result"
            sx={{
              "&.active": { backgroundColor: "#334155" },
              "&:hover": { backgroundColor: "#334155" },
            }}
          >
            <ListItemText primary="Final Result" />
          </ListItemButton>

          <Divider sx={{ my: 2, backgroundColor: "rgba(255,255,255,0.2)" }} />

          {/* USER MANAGEMENT */}
          <Typography sx={{ px: 3, pb: 1, fontSize: 13, opacity: 0.7 }}>
            USER MANAGEMENT
          </Typography>

          <ListItemButton
            component={NavLink}
            to="faculty/add"
            sx={{
              "&.active": { backgroundColor: "#334155" },
              "&:hover": { backgroundColor: "#334155" },
            }}
          >
            <ListItemText primary="Add Faculty" />
          </ListItemButton>
          
          <ListItemButton
            component={NavLink}
            to="faculty"
            sx={{
              "&.active": { backgroundColor: "#334155" },
              "&:hover": { backgroundColor: "#334155" },
            }}
          >
            <ListItemText primary="Faculty Management" />
          </ListItemButton>

         <ListItemButton
            component={NavLink}
            to="students"
            sx={{
              "&.active": { backgroundColor: "#334155" },
              "&:hover": { backgroundColor: "#334155" },
            }}
          >
            <ListItemText primary="Student Management" />
          </ListItemButton>

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
        <Outlet />
      </Box>

    </Box>
  );
};

export default AdminDashboard;
