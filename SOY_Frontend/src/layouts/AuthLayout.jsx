import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const location = useLocation();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0f172a 0%, #0b1a35 100%)",
        overflow: "hidden",
      }}
    >
      <motion.div
        key={location.pathname}
        initial={{ x: 120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -120, opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <Outlet />
      </motion.div>
    </Box>
  );
};

export default AuthLayout;
