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

    const accessToken = jwt.sign(
      {
        id: client.id,
        type: "client"
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m"
      }
    );

    const refreshToken = jwt.sign(
      {
        id: client.id,
        type: "client"
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    client.refreshToken = refreshToken;
    await client.save();

    res.json({
      mensaje: "Login de cliente correcto",
      accessToken,
      refreshToken
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

    const accessToken = jwt.sign(
      {
        id: admin.id,
        type: "admin",
        role: admin.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m"
      }
    );

    const refreshToken = jwt.sign(
      {
        id: admin.id,
        type: "admin",
        role: admin.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    admin.refreshToken = refreshToken;
    await admin.save();

    res.json({
      mensaje: "Login de administrador correcto",
      accessToken,
      refreshToken
    });

  } catch (error) {
    res.status(500).json({
      mensaje: error.message
    });
  }
};


// Renovar Access Token
export const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        mensaje: "Refresh token no proporcionado"
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET
    );

    let usuario;

    if (decoded.type === "client") {
      usuario = await Client.findByPk(decoded.id);
    } else if (decoded.type === "admin") {
      usuario = await Admin.findByPk(decoded.id);
    }

    if (
      !usuario ||
      usuario.refreshToken !== refreshToken
    ) {
      return res.status(401).json({
        mensaje: "Refresh token inválido"
      });
    }

    const payload = {
      id: usuario.id,
      type: decoded.type
    };

    if (decoded.type === "admin") {
      payload.role = usuario.role;
    }

    const accessToken = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "15m"
      }
    );

    res.json({
      accessToken
    });

  } catch (error) {
    res.status(401).json({
      mensaje: "Refresh token inválido o expirado"
    });
  }
};


// Cerrar sesión
export const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        mensaje: "Refresh token no proporcionado"
      });
    }

    const client = await Client.findOne({
      where: { refreshToken }
    });

    if (client) {
      client.refreshToken = null;
      await client.save();

      return res.json({
        mensaje: "Sesión cerrada correctamente"
      });
    }

    const admin = await Admin.findOne({
      where: { refreshToken }
    });

    if (admin) {
      admin.refreshToken = null;
      await admin.save();

      return res.json({
        mensaje: "Sesión cerrada correctamente"
      });
    }

    return res.status(401).json({
      mensaje: "Refresh token inválido"
    });

  } catch (error) {
    res.status(500).json({
      mensaje: error.message
    });
  }
};

