import { useEffect, useState } from "react";
import api from "../services/api.js";

const AdminProductos = () => {
  const [productos, setProductos] = useState([]);

  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");
  const [orden, setOrden] = useState("");

  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);

  const [idEditar, setIdEditar] = useState(null);

  const [formulario, setFormulario] = useState({
    name: "",
    price: "",
    stock: "",
    category: ""
  });

  const cargarProductos = () => {
    let url = `/products?page=${pagina}&limit=5`;

    if (busqueda) {
      url += `&search=${busqueda}`;
    }

    if (categoria) {
      url += `&category=${categoria}`;
    }

    if (orden === "menor") {
      url += "&sortBy=price&order=ASC";
    }

    if (orden === "mayor") {
      url += "&sortBy=price&order=DESC";
    }

    api
      .get(url)
      .then((response) => {
        setProductos(response.data.products);
        setTotalPaginas(response.data.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    cargarProductos();
  }, [pagina, categoria, orden]);

  const buscar = () => {
    setPagina(1);
    cargarProductos();
  };

  const cambiarFormulario = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const guardarProducto = (e) => {
    e.preventDefault();

    if (idEditar) {
      api
        .put(`/products/${idEditar}`, formulario)
        .then(() => {
          limpiarFormulario();
          cargarProductos();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      api
        .post("/products", formulario)
        .then(() => {
          limpiarFormulario();
          setPagina(1);
          cargarProductos();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const editarProducto = (producto) => {
    setIdEditar(producto.id);

    setFormulario({
      name: producto.name,
      price: producto.price,
      stock: producto.stock,
      category: producto.category
    });
  };

  const eliminarProducto = (id) => {
    const confirmar = window.confirm(
      "¿Está seguro de eliminar este producto?"
    );

    if (!confirmar) {
      return;
    }

    api
      .delete(`/products/${id}`)
      .then(() => {
        cargarProductos();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const limpiarFormulario = () => {
    setIdEditar(null);

    setFormulario({
      name: "",
      price: "",
      stock: "",
      category: ""
    });
  };

  return (
    <div>
      <h2>Administración de Productos</h2>

      <h3>
        {idEditar ? "Modificar producto" : "Crear producto"}
      </h3>

      <form onSubmit={guardarProducto}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formulario.name}
          onChange={cambiarFormulario}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={formulario.price}
          onChange={cambiarFormulario}
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formulario.stock}
          onChange={cambiarFormulario}
          required
        />

        <select
          name="category"
          value={formulario.category}
          onChange={cambiarFormulario}
          required
        >
          <option value="">Seleccione categoría</option>
          <option value="Tecnologia">Tecnologia</option>
          <option value="Muebles">Muebles</option>
          <option value="Hogar">Hogar</option>
        </select>

        <button type="submit">
          {idEditar ? "Guardar cambios" : "Crear producto"}
        </button>

        {idEditar && (
          <button
            type="button"
            onClick={limpiarFormulario}
          >
            Cancelar
          </button>
        )}
      </form>

      <hr />

      <h3>Listado de productos</h3>

      <div>
        <input
          type="text"
          placeholder="Buscar producto"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              buscar();
            }
          }}
        />

        <button onClick={buscar}>
          Buscar
        </button>
      </div>

      <div>
        <select
          value={categoria}
          onChange={(e) => {
            setCategoria(e.target.value);
            setPagina(1);
          }}
        >
          <option value="">Todas las categorías</option>
          <option value="Tecnologia">Tecnologia</option>
          <option value="Muebles">Muebles</option>
          <option value="Hogar">Hogar</option>
        </select>

        <select
          value={orden}
          onChange={(e) => {
            setOrden(e.target.value);
            setPagina(1);
          }}
        >
          <option value="">Ordenar por nombre</option>
          <option value="menor">Precio: menor a mayor</option>
          <option value="mayor">Precio: mayor a menor</option>
        </select>
      </div>

      <br />

      {productos.length === 0 ? (
        <p>No hay productos.</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>{producto.name}</td>
                <td>${producto.price}</td>
                <td>{producto.stock}</td>
                <td>{producto.category}</td>

                <td>
                  <button
                    onClick={() => editarProducto(producto)}
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => eliminarProducto(producto.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div>
        <button
          onClick={() => setPagina(pagina - 1)}
          disabled={pagina === 1}
        >
          Anterior
        </button>

        <span>
          {" "}
          Página {pagina} de {totalPaginas}{" "}
        </span>

        <button
          onClick={() => setPagina(pagina + 1)}
          disabled={pagina >= totalPaginas}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default AdminProductos;

