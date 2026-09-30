import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Client from "../models/Client.js";
import Admin from "../models/Admin.js";

// Login de cliente
export const loginClient = async (req, res) => {
  try {
    const { email, password } = req.body;

    const client = await Client.findOne({
      where: { email }
    });

    if (!client) {
      return res.status(401).json({
        mensaje: "Email o contraseña incorrectos"
      });
    }

    const passwordCorrecta = await bcrypt.compare(
      password,
      client.password
    );

    if (!passwordCorrecta) {
      return res.status(401).json({
        mensaje: "Email o contraseña incorrectos"
      });
    }

    const token = jwt.sign(
      {
        id: client.id,
        type: "client"
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    res.json({
      mensaje: "Login de cliente correcto",
      token
    });

  } catch (error) {
    res.status(500).json({
      mensaje: error.message
    });
  }
};


// Login de administrador
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({
      where: { email }
    });

    if (!admin) {
      return res.status(401).json({
        mensaje: "Email o contraseña incorrectos"
      });
    }

    const passwordCorrecta = await bcrypt.compare(
      password,
      admin.password
    );

    if (!passwordCorrecta) {
      return res.status(401).json({
        mensaje: "Email o contraseña incorrectos"
      });
    }

const token = jwt.sign(
    {
      id: admin.id,
      type: "admin",
      role: admin.role
    },
    process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    res.json({
      mensaje: "Login de administrador correcto",
      token
    });

  } catch (error) {
    res.status(500).json({
      mensaje: error.message
    });
  }
};

