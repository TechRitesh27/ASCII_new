import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";

import Profile from "../pages/Profile";
import StudentDashboard from "../pages/StudentDashboard";
import FacultyDashboard from "../pages/FacultyDashboard";
import AdminDashboard from "../pages/AdminDashboard";

import NominationForm from "../pages/NominationForm";
import Voting from "../pages/Voting";
import FacultyEvaluation from "../pages/FacultyEvaluation";
import FacultyNominations from "../pages/FacultyNominations";
import FacultyEvaluationHistory from "../pages/FacultyEvaluationHistory";
import FacultyProfile from "../pages/FacultyProfile";

import Result from "../pages/Result";
import AddFaculty from "../pages/AddFaculty";
import AdminFacultyList from "../pages/AdminFacultyList";

import AdminUsers from "../pages/AdminUsers";
import RequireAuth from "../auth/RequireAuth";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ---------- PUBLIC ---------- */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="faculty" element={<AdminUsers role="FACULTY" />} />
      <Route path="students" element={<AdminUsers role="STUDENT" />} />
      {/* ---------- STUDENT ---------- */}
      <Route
        path="/student"
        element={
          <RequireAuth allowedRole="STUDENT">
            <StudentDashboard />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="nominate" replace />} />
        <Route path="nominate" element={<NominationForm />} />
        <Route path="vote" element={<Voting />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* ---------- FACULTY ---------- */}
      <Route
        path="/faculty"
        element={
          <RequireAuth allowedRole="FACULTY">
            <FacultyDashboard />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="nominations" replace />} />
        <Route path="nominations" element={<FacultyNominations />} />
        <Route path="evaluate/:nominationId" element={<FacultyEvaluation />} />
        <Route path="evaluations/my" element={<FacultyEvaluationHistory />} />
        <Route path="profile" element={<FacultyProfile />} />
      </Route>

      {/* ---------- ADMIN ---------- */}
      {/* ---------- ADMIN ---------- */}
      <Route
        path="/admin"
        element={
          <RequireAuth allowedRole="ADMIN">
            <AdminDashboard />
          </RequireAuth>
        }
      >
        <Route index element={<Navigate to="result" replace />} />
        <Route path="result" element={<Result />} />

        {/* Faculty management */}
        <Route path="faculty">
          <Route index element={<Navigate to="list" replace />} />
          <Route path="add" element={<AddFaculty />} />
          <Route path="list" element={<AdminFacultyList />} />
        </Route>

        {/* User enable / disable */}
        <Route path="students" element={<AdminUsers role="STUDENT" />} />
        <Route path="faculties" element={<AdminUsers role="FACULTY" />} />
      </Route>

      {/* ---------- FALLBACK ---------- */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
