import express from "express";

import {
  register,
  verifyOtp,
  login,
  getCurrentUser,
  logout,
} from "../controllers/authController/authController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/verify-otp", verifyOtp);

router.post("/login", login);

router.get("/me", protect, getCurrentUser);

router.post("/logout", protect, logout);

export default router;