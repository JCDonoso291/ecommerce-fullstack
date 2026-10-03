import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { ThemeContext } from "../context/ThemeContext.jsx";

const Header = () => {
  const { token, userType, adminRole, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="header">
      <h2>eCommerce Fullstack</h2>

      <nav className="header-nav">
        <Link to="/">Inicio</Link>

        {!token && (
          <>
            <Link to="/login">Cliente</Link>
            <Link to="/admin/login">Administrador</Link>
          </>
        )}

        {token && userType === "client" && (
          <Link to="/cliente/dashboard">Panel Cliente</Link>
        )}

        {token && userType === "admin" && (
          <>
            <Link to="/admin/dashboard">Panel Admin</Link>
            <span>Rol: {adminRole}</span>
          </>
        )}

        {token && (
          <button onClick={logout}>
            Cerrar sesión
          </button>
        )}

        <button onClick={toggleTheme}>
          {theme === "light" ? "Modo oscuro" : "Modo claro"}
        </button>
      </nav>
    </header>
  );
};

export default Header;

