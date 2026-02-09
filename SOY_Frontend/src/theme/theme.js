import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1E3A8A",
    },
    secondary: {
      main: "#F59E0B",
    },
    background: {
      default: "#F3F4F6",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    h4: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 10,
  },
});

export default theme;
