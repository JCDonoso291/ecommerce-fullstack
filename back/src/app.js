import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import sequelize from "./config/database.js";
import Client from "./models/Client.js";
import Admin from "./models/Admin.js";
import authRoutes from "./routes/authRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida correctamente.");

    await sequelize.sync({ alter: true });
    console.log("Tablas sincronizadas correctamente.");

    // Administrador principal
    const adminExistente = await Admin.findOne({
      where: { email: "admin@tienda.com" }
    });

    if (!adminExistente) {
      const passwordAdmin = await bcrypt.hash("admin123", 10);

      await Admin.create({
        nombre: "Administrador",
        email: "admin@tienda.com",
        password: passwordAdmin,
        role: "superadmin"
      });

      console.log("Administrador inicial creado.");
    }

    // Administrador auditor
    const auditorExistente = await Admin.findOne({
      where: { email: "auditor@tienda.com" }
    });

    if (!auditorExistente) {
      const passwordAuditor = await bcrypt.hash("auditor123", 10);

      await Admin.create({
        nombre: "Auditor",
        email: "auditor@tienda.com",
        password: passwordAuditor,
        role: "auditor"
      });

      console.log("Auditor inicial creado.");
    }

    // Cliente
    const clientExistente = await Client.findOne({
      where: { email: "cliente@tienda.com" }
    });

    if (!clientExistente) {
      const passwordClient = await bcrypt.hash("cliente123", 10);

      await Client.create({
        nombre: "Cliente",
        email: "cliente@tienda.com",
        password: passwordClient,
        direccion: "Dirección de prueba",
        telefono: "123456789"
      });

      console.log("Cliente inicial creado.");
    }

    app.listen(PORT, () => {
      console.log(`Servidor iniciado en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
};

iniciarServidor();

