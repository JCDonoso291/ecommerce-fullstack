import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

const ClientRoute = ({ children }) => {
  const { token, userType } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (userType !== "client") {
    return <Navigate to="/admin/dashboard" />;
  }

  return children;
};

export default ClientRoute;

