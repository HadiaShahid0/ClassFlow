import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Class = sequelize.define(
  "Class",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    organizationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "classes",
    timestamps: true,
  }
);

export default Class;