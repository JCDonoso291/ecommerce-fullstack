import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Admin = sequelize.define(
  "Admin",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    role: {
      type: DataTypes.ENUM(
        "superadmin",
        "gestor_productos",
        "auditor"
      ),
      allowNull: false,
      defaultValue: "superadmin"
    },

    refreshToken: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    tableName: "admins",
    timestamps: false
  }
);

export default Admin;


