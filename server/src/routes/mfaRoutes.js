import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  setupMfa,
  verifyMfaSetup,
  disableMfa,
} from "../controllers/mfaController/mfaController.js";

const router = express.Router();

router.post("/setup", protect, setupMfa);

router.post("/verify", protect, verifyMfaSetup);

router.post("/disable", protect, disableMfa);

export default router;