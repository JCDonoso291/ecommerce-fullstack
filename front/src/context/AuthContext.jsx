import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginClient as loginClientService,
  loginAdmin as loginAdminService,
} from "../services/authService.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  const [userType, setUserType] = useState(
    localStorage.getItem("userType")
  );

  const [adminRole, setAdminRole] = useState(
    localStorage.getItem("adminRole")
  );

  const [isLoading, setIsLoading] = useState(false);

  const loginClient = (email, password) => {
    setIsLoading(true);

    return loginClientService(email, password)
      .then((response) => {
        const nuevoToken = response.data.token;

        localStorage.setItem("token", nuevoToken);
        localStorage.setItem("userType", "client");
        localStorage.removeItem("adminRole");

        setToken(nuevoToken);
        setUserType("client");
        setAdminRole(null);

        navigate("/cliente/dashboard");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const loginAdmin = (email, password) => {
    setIsLoading(true);

    return loginAdminService(email, password)
      .then((response) => {
        const nuevoToken = response.data.token;

        const payload = JSON.parse(
          atob(nuevoToken.split(".")[1])
        );

        const role = payload.role;

        localStorage.setItem("token", nuevoToken);
        localStorage.setItem("userType", "admin");
        localStorage.setItem("adminRole", role);

        setToken(nuevoToken);
        setUserType("admin");
        setAdminRole(role);

        navigate("/admin/dashboard");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("adminRole");

    setUser(null);
    setToken(null);
    setUserType(null);
    setAdminRole(null);

    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        userType,
        adminRole,
        isLoading,
        loginClient,
        loginAdmin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

