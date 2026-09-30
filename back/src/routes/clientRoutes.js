import express from "express";
import Client from "../models/Client.js";
import {
  verifyToken,
  isClient
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/perfil", verifyToken, isClient, async (req, res) => {
  try {
    const client = await Client.findByPk(req.user.id, {
      attributes: {
        exclude: ["password"]
      }
    });

    if (!client) {
      return res.status(404).json({
        mensaje: "Cliente no encontrado"
      });
    }

    res.json(client);

  } catch (error) {
    res.status(500).json({
      mensaje: error.message
    });
  }
});

export default router;

