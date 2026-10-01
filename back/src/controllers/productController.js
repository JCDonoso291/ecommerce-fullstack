import { Op } from "sequelize";
import Product from "../models/Product.js";

// Obtener productos con paginación, búsqueda, filtro y orden
export const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 5,
      search = "",
      category = "",
      sortBy = "name",
      order = "ASC"
    } = req.query;

    const where = {};

    if (search) {
      where.name = {
        [Op.like]: `%${search}%`
      };
    }

    if (category) {
      where.category = category;
    }

    const campoOrden =
      sortBy === "price" ? "price" : "name";

    const tipoOrden =
      order === "DESC" ? "DESC" : "ASC";

    const pagina = parseInt(page);
    const limite = parseInt(limit);
    const offset = (pagina - 1) * limite;

    const resultado = await Product.findAndCountAll({
      where,
      limit: limite,
      offset,
      order: [[campoOrden, tipoOrden]]
    });

    const totalPages = Math.ceil(
      resultado.count / limite
    );

    res.json({
      products: resultado.rows,
      totalProducts: resultado.count,
      currentPage: pagina,
      totalPages
    });

  } catch (error) {
    res.status(500).json({
      mensaje: error.message
    });
  }
};


// Crear producto
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      stock,
      category
    } = req.body;

    const product = await Product.create({
      name,
      price,
      stock,
      category
    });

    res.status(201).json(product);

  } catch (error) {
    res.status(500).json({
      mensaje: error.message
    });
  }
};


// Modificar producto
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        mensaje: "Producto no encontrado"
      });
    }

    await product.update(req.body);

    res.json(product);

  } catch (error) {
    res.status(500).json({
      mensaje: error.message
    });
  }
};


// Eliminar producto
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        mensaje: "Producto no encontrado"
      });
    }

    await product.destroy();

    res.json({
      mensaje: "Producto eliminado correctamente"
    });

  } catch (error) {
    res.status(500).json({
      mensaje: error.message
    });
  }
};

