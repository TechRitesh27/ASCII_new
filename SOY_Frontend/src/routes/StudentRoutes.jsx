import { Routes, Route, Navigate } from "react-router-dom";
import StudentDashboard from "../pages/student/StudentDashboard";
import NominationForm from "../pages/student/NominationForm";
import Voting from "../pages/student/Voting";
import Profile from "../pages/student/StudentProfile";

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StudentDashboard />}>
        <Route index element={<Navigate to="nominate" replace />} />
        <Route path="nominate" element={<NominationForm />} />
        <Route path="vote" element={<Voting />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default StudentRoutes;
