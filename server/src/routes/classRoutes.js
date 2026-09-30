import express from "express";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

import {
  createClass,
  getClasses,
  getClassById,
  updateClass,
  assignTeacher,
  deleteClass,
} from "../controllers/classController/classController.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorizeRoles("organization"),
  createClass
);

router.get(
  "/",
  protect,
  authorizeRoles("organization"),
  getClasses
);

router.get(
  "/:classId",
  protect,
  authorizeRoles("organization"),
  getClassById
);

router.patch(
  "/:classId",
  protect,
  authorizeRoles("organization"),
  updateClass
);

router.patch(
  "/:classId/teacher",
  protect,
  authorizeRoles("organization"),
  assignTeacher
);

router.delete(
  "/:classId",
  protect,
  authorizeRoles("organization"),
  deleteClass
);

export default router;