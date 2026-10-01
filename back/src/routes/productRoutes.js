import express from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

import {
  verifyToken,
  isAdmin,
  checkAdminRole
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Obtener productos
router.get("/", getProducts);

// Crear producto
router.post(
  "/",
  verifyToken,
  isAdmin,
  checkAdminRole(["superadmin", "gestor_productos"]),
  createProduct
);

// Modificar producto
router.put(
  "/:id",
  verifyToken,
  isAdmin,
  checkAdminRole(["superadmin", "gestor_productos"]),
  updateProduct
);

// Eliminar producto
router.delete(
  "/:id",
  verifyToken,
  isAdmin,
  checkAdminRole(["superadmin", "gestor_productos"]),
  deleteProduct
);

export default router;

