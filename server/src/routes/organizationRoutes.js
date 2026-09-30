import express from "express";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

import {
  createTeacher,
  getTeachers,
} from "../controllers/organizationController/organizationController.js";

const router = express.Router();

router.post(
  "/teachers",
  protect,
  authorizeRoles("organization"),
  createTeacher,
);

router.get("/teachers", protect, authorizeRoles("organization"), getTeachers);

export default router;
