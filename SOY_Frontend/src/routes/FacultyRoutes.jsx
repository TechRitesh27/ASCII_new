import { Routes, Route, Navigate } from "react-router-dom";
import FacultyDashboard from "../pages/faculty/facultyDashboard";
import FacultyNominations from "../pages/faculty/FacultyNominations";
import FacultyEvaluation from "../pages/faculty/FacultyEvaluation";
import FacultyEvaluationHistory from "../pages/faculty/FacultyEvaluationHistory";
import FacultyProfile from "../pages/faculty/FacultyProfile";

const FacultyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<FacultyDashboard />}>
        <Route index element={<Navigate to="nominations" replace />} />
        <Route path="nominations" element={<FacultyNominations />} />
        <Route path="evaluate/:nominationId" element={<FacultyEvaluation />} />
        <Route path="evaluations/my" element={<FacultyEvaluationHistory />} />
        <Route path="profile" element={<FacultyProfile />} />
      </Route>
    </Routes>
  );
};

export default FacultyRoutes;
