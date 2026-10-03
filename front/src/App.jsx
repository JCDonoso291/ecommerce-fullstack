import { Routes, Route } from "react-router-dom";

import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import LoginForm from "./components/LoginForm.jsx";
import AdminLoginForm from "./components/AdminLoginForm.jsx";
import ClientDashboard from "./components/ClientDashboard.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";

import ClientRoute from "./components/ClientRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import AdminRoleGuard from "./components/AdminRoleGuard.jsx";

import AdminUsuarios from "./components/AdminUsuarios.jsx";
import AdminProductos from "./components/AdminProductos.jsx";
import AdminReportes from "./components/AdminReportes.jsx";
import SinPermiso from "./components/SinPermiso.jsx";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<LoginForm />} />

        <Route path="/admin/login" element={<AdminLoginForm />} />

        <Route
          path="/cliente/dashboard"
          element={
            <ClientRoute>
              <ClientDashboard />
            </ClientRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/usuarios"
          element={
            <AdminRoute>
              <AdminRoleGuard allowedRoles={["superadmin"]}>
                <AdminUsuarios />
              </AdminRoleGuard>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/productos"
          element={
            <AdminRoute>
              <AdminRoleGuard
                allowedRoles={["superadmin", "gestor_productos"]}
              >
                <AdminProductos />
              </AdminRoleGuard>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/reportes"
          element={
            <AdminRoute>
              <AdminRoleGuard
                allowedRoles={["superadmin", "auditor"]}
              >
                <AdminReportes />
              </AdminRoleGuard>
            </AdminRoute>
          }
        />

        <Route
          path="/admin/sin-permiso"
          element={
            <AdminRoute>
              <SinPermiso />
            </AdminRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;

