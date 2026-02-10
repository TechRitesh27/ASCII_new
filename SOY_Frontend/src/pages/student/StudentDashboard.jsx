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
  Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../services/api";

const drawerWidth = 240;

const StudentDashboard = () => {
  const [votingOpen, setVotingOpen] = useState(false);

  /* ================= LOAD VOTING STATUS ================= */

  const fetchVotingStatus = async () => {
    try {
      const res = await api.get("/public/voting-status");
      setVotingOpen(res.data);
    } catch {
      setVotingOpen(false);
    }
  };

  useEffect(() => {
    fetchVotingStatus();
  }, []);

  const menuItems = [
    { label: "Nomination", path: "nominate" },
    { label: "Voting", path: "vote" },
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
            backgroundColor: "#0f172a",
            color: "#fff",
          },
        }}
      >
        <Toolbar />

        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Student Panel
          </Typography>

          {/* Voting Status Badge */}
          <Chip
            label={votingOpen ? "Voting Open" : "Voting Closed"}
            color={votingOpen ? "success" : "error"}
            size="small"
            sx={{ mb: 2 }}
          />

          <List>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.path}
                component={NavLink}
                to={item.path}
                disabled={item.path === "vote" && !votingOpen}
                sx={{
                  color: "inherit",
                  "&.active": {
                    backgroundColor: "#1e293b",
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
          Student Dashboard
        </Typography> */}

        <Outlet />
      </Box>
    </Box>
  );
};

export default StudentDashboard;
