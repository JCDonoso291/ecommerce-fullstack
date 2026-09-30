import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const AdminRoute = ({ children }) => {
  const { token, userType } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  if (userType !== "admin") {
    return <Navigate to="/cliente/dashboard" />;
  }

  return children;
};

export default AdminRoute;

