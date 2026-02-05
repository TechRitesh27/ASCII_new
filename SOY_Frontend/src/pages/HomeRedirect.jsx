import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const HomeRedirect = () => {
  const { auth } = useAuth();

  if (!auth) return <Navigate to="/login" />;

  if (auth.role === "STUDENT") return <Navigate to="/student" />;
  if (auth.role === "FACULTY") return <Navigate to="/faculty" />;
  if (auth.role === "ADMIN") return <Navigate to="/admin" />;

  return <Navigate to="/login" />;
};

export default HomeRedirect;
