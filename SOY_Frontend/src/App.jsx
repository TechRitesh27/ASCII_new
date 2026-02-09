import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline, Toolbar } from "@mui/material";
import { AuthProvider } from "./auth/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import theme from "./theme/theme";
import MainNavbar from "./components/MainNavbar";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <MainNavbar />
          <Toolbar /> {/* pushes content below navbar */}
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
