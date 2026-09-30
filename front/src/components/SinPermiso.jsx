import { Link } from "react-router-dom";

const SinPermiso = () => {
  return (
    <div>
      <h2>Acceso denegado</h2>

      <p>No tiene permisos para acceder a esta sección.</p>

      <Link to="/admin/dashboard">
        Volver al panel de administración
      </Link>
    </div>
  );
};

export default SinPermiso;

