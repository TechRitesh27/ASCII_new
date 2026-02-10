import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminControlPanel from "../pages/admin/AdminControlPanel";
import Result from "../pages/admin/Result";
import AddFaculty from "../pages/admin/AddFaculty";
import AdminUsers from "../pages/admin/AdminUsers";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />}>

        <Route index element={<Navigate to="control" replace />} />

        {/* System */}
        <Route path="control" element={<AdminControlPanel />} />
        <Route path="result" element={<Result />} />

        {/* Faculty */}
        <Route path="faculty">
          <Route index element={<AdminUsers role="FACULTY" />} />
          <Route path="add" element={<AddFaculty />} />
        </Route>

        {/* Students */}
        <Route path="students" element={<AdminUsers role="STUDENT" />} />

      </Route>
    </Routes>
  );
};

export default AdminRoutes;
