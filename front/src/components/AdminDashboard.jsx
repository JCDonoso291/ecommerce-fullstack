import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import api from "../services/api.js";

const AdminDashboard = () => {
  const { logout, adminRole } = useContext(AuthContext);
  const [metricas, setMetricas] = useState(null);

  useEffect(() => {
    api.get("/admin/metricas")
      .then((response) => {
        setMetricas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!metricas) {
    return <p>Cargando métricas...</p>;
  }

  return (
    <div>
      <h2>Panel de Administración</h2>

      <p>Rol: {adminRole}</p>

      <p>{metricas.mensaje}</p>
      <p>Clientes: {metricas.clientes}</p>
      <p>Productos: {metricas.productos}</p>
      <p>Ventas: {metricas.ventas}</p>

      <h3>Menú</h3>

      {adminRole === "superadmin" && (
        <p>
          <Link to="/admin/usuarios">
            Usuarios
          </Link>
        </p>
      )}

      {(adminRole === "superadmin" ||
        adminRole === "gestor_productos") && (
        <p>
          <Link to="/admin/productos">
            Productos
          </Link>
        </p>
      )}

      {(adminRole === "superadmin" ||
        adminRole === "auditor") && (
        <p>
          <Link to="/admin/reportes">
            Reportes
          </Link>
        </p>
      )}

      <button onClick={logout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default AdminDashboard;

