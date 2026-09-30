import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const StudentProfile = sequelize.define(
  "StudentProfile",
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

    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    classId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    rollNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "student_profiles",
    timestamps: true,
  }
);

export default StudentProfile;