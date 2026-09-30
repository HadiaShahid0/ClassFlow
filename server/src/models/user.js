import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const User = sequelize.define(
  "User",
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

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM("organization", "teacher", "student"),
      allowNull: false,
      defaultValue: "organization"
    },

    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    otp: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    otpExpiredAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    isMfaEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    mfaSecret: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    profileImage: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    resetPasswordOtp: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },

    resetPasswordOtpExpiredAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  },
);

export default User;
