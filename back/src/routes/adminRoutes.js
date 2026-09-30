import express from "express";
import {
  verifyToken,
  isAdmin,
  checkAdminRole
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Métricas administrativas
router.get("/metricas", verifyToken, isAdmin, (req, res) => {
  res.json({
    mensaje: "Métricas administrativas",
    clientes: 1,
    productos: 0,
    ventas: 0
  });
});

// Solo superadmin
router.get(
  "/usuarios",
  verifyToken,
  isAdmin,
  checkAdminRole(["superadmin"]),
  (req, res) => {
    res.json({
      mensaje: "Listado de usuarios"
    });
  }
);

// Superadmin o gestor de productos
router.post(
  "/productos",
  verifyToken,
  isAdmin,
  checkAdminRole(["superadmin", "gestor_productos"]),
  (req, res) => {
    res.json({
      mensaje: "Producto creado correctamente"
    });
  }
);

// Superadmin o auditor
router.get(
  "/reportes",
  verifyToken,
  isAdmin,
  checkAdminRole(["superadmin", "auditor"]),
  (req, res) => {
    res.json({
      mensaje: "Reportes administrativos"
    });
  }
);

export default router;

