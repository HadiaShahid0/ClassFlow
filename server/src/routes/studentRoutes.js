import express from "express";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController/studentController.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("teacher"),
  createStudent
);

router.get(
  "/",
  protect,
  authorizeRoles("teacher"),
  getStudents
);

router.get(
  "/:studentId",
  protect,
  authorizeRoles("teacher"),
  getStudentById
);

router.patch(
  "/:studentId",
  protect,
  authorizeRoles("teacher"),
  updateStudent
);

router.delete(
  "/:studentId",
  protect,
  authorizeRoles("teacher"),
  deleteStudent
);

export default router;