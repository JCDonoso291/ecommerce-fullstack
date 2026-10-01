import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },

    stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    category: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: "products",
    timestamps: false
  }
);

export default Product;

