import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import api from "../services/api.js";

const ClientDashboard = () => {
  const { user, setUser, logout } = useContext(AuthContext);

  useEffect(() => {
    api.get("/client/perfil")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setUser]);

  if (!user) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div>
      <h2>Panel del Cliente</h2>

      <p>Nombre: {user.nombre}</p>
      <p>Email: {user.email}</p>
      <p>Dirección: {user.direccion}</p>
      <p>Teléfono: {user.telefono}</p>

      <button onClick={logout}>
        Cerrar sesión
      </button>
    </div>
  );
};

export default ClientDashboard;

