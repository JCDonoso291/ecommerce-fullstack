import api from "./api.js";

// Login de cliente
export const loginClient = (email, password) => {
  return api.post("/auth/client/login", {
    email,
    password,
  });
};

// Login de administrador
export const loginAdmin = (email, password) => {
  return api.post("/auth/admin/login", {
    email,
    password,
  });
};

// Renovar Access Token
export const renovarToken = (refreshToken) => {
  return api.post("/auth/refresh", {
    refreshToken,
  });
};

// Cerrar sesión
export const cerrarSesion = (refreshToken) => {
  return api.post("/auth/logout", {
    refreshToken,
  });
};

