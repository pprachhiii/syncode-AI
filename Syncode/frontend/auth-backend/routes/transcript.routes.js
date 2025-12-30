import express from "express";
import {
  createTranscript,
  getProcessingStatus,
  updateProcessingStatus,
} from "../controllers/transcript.controller.js";
import { verifyToken } from "../middleware/auth.js";
import { upload } from "../lib/upload.js";
import { verifyInternalApiKey } from "../middleware/internalAuth.js";

const router = express.Router();

// User upload
router.post("/upload", verifyToken, upload.array("files"), createTranscript);

// Internal ML service route (secured)
router.post(
  "/internal/processing-status",
  verifyInternalApiKey,
  updateProcessingStatus
);

// Frontend polling route
router.get("/:transcriptId/status", verifyToken, getProcessingStatus);

export default router;
