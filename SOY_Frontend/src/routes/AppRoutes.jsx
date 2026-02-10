import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import RequireAuth from "../auth/RequireAuth";

import StudentRoutes from "./StudentRoutes";
import FacultyRoutes from "./FacultyRoutes";
import AdminRoutes from "./AdminRoutes";

import AuthLayout from "../layouts/AuthLayout";

const AppRoutes = () => {
  return (
    <Routes>

      {/* ================= PUBLIC ================= */}
      <Route path="/" element={<Home />} />

      {/* Auth Pages with Animation Layout */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* ================= STUDENT ================= */}
      <Route
        path="/student/*"
        element={
          <RequireAuth allowedRole="STUDENT">
            <StudentRoutes />
          </RequireAuth>
        }
      />

      {/* ================= FACULTY ================= */}
      <Route
        path="/faculty/*"
        element={
          <RequireAuth allowedRole="FACULTY">
            <FacultyRoutes />
          </RequireAuth>
        }
      />

      {/* ================= ADMIN ================= */}
      <Route
        path="/admin/*"
        element={
          <RequireAuth allowedRole="ADMIN">
            <AdminRoutes />
          </RequireAuth>
        }
      />

      {/* ================= FALLBACK ================= */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
};

export default AppRoutes;
