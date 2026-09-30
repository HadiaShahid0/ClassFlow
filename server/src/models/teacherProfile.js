import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const TeacherProfile = sequelize.define(
  "TeacherProfile",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },

    organizationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    qualification: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    subject: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "teacher_profiles",
    timestamps: true,
  }
);

export default TeacherProfile;