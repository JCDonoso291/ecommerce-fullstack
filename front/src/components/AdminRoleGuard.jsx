import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const AdminRoleGuard = ({ allowedRoles, children }) => {
  const { userType, adminRole } = useContext(AuthContext);

  if (userType !== "admin") {
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(adminRole)) {
    return <Navigate to="/admin/sin-permiso" />;
  }

  return children;
};

export default AdminRoleGuard;

