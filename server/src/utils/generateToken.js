import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (userId) => {
  console.log(
  "JWT secret exists:",
  Boolean(process.env.JWT_SECRET_KEY)
);
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );
  
};

export const generateMfaToken = (userId) => {
  return jwt.sign(
    {
      userId,
      type: "mfa",
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "5m",
    }
  );
};

export const generatePasswordResetToken = (
  userId
) => {
  return jwt.sign(
    {
      userId,
      type: "password-reset",
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "10m",
    }
  );
};