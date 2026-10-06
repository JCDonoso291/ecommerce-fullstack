import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api.js";

const Home = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    api
      .get("/products?page=1&limit=4")
      .then((response) => {
        setProductos(response.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {/* MENÚ */}
      <nav className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Tienda Online</h1>

          <button
            className="md:hidden"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            Menú
          </button>

          <div className="hidden md:flex gap-4">
            <Link to="/">Inicio</Link>
            <Link to="/login">Cliente</Link>
            <Link to="/admin/login">Administrador</Link>
          </div>
        </div>

        {menuAbierto && (
          <div className="flex flex-col gap-2 mt-4 md:hidden">
            <Link to="/">Inicio</Link>
            <Link to="/login">Cliente</Link>
            <Link to="/admin/login">Administrador</Link>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="flex flex-col md:flex-row items-center p-6 gap-6">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4">
            Bienvenido a nuestra tienda
          </h2>

          <p className="mb-4">
            Encontrá los mejores productos para vos.
          </p>

          <Link to="/login">
            <button>Ver productos</button>
          </Link>
        </div>

        <div className="flex-1 text-center">
          <div className="text-6xl">
            TIENDA
          </div>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="p-6">
        <h2 className="text-2xl font-bold mb-6">
          Categorías destacadas
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border p-6 text-center transition hover:scale-105">
            Tecnología
          </div>

          <div className="border p-6 text-center transition hover:scale-105">
            Muebles
          </div>

          <div className="border p-6 text-center transition hover:scale-105">
            Hogar
          </div>

          <div className="border p-6 text-center transition hover:scale-105">
            Ofertas
          </div>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section className="p-6">
        <h2 className="text-2xl font-bold mb-6">
          Productos destacados
        </h2>

        {productos.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {productos.map((producto) => (
              <div
                key={producto.id}
                className="border p-4"
              >
                <div className="h-40 border flex items-center justify-center mb-4">
                  Producto
                </div>

                <span className="text-sm">
                  Oferta
                </span>

                <h3 className="text-xl font-bold mt-2">
                  {producto.name}
                </h3>

                <p className="text-lg">
                  ${Number(producto.price).toLocaleString("es-AR")}
                </p>

                <button>
                  Comprar
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="border-t p-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-bold mb-2">
              Tienda Online
            </h3>
            <p>Tu tienda de confianza.</p>
          </div>

          <div>
            <h3 className="font-bold mb-2">
              Enlaces
            </h3>
            <p>
              <Link to="/">Inicio</Link>
            </p>
            <p>
              <Link to="/login">Cliente</Link>
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-2">
              Contacto
            </h3>
            <p>tienda@tienda.com</p>
            <p>Salta, Argentina</p>
          </div>
        </div>

        <p className="text-center mt-6">
          © 2026 Tienda Online
        </p>
      </footer>
    </div>
  );
};

export default Home;

