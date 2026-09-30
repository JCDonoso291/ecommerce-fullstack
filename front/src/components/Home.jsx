import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Tienda Online</h1>

      <p>Seleccione cómo desea ingresar</p>

      <Link to="/login">
        <button>Ingresar como Cliente</button>
      </Link>

      <Link to="/admin/login">
        <button>Ingresar como Administrador</button>
      </Link>
    </div>
  );
};

export default Home;

