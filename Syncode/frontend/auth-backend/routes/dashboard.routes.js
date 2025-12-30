import { getDashboardData } from "../controllers/dashboard.controller.js";
import { verifyToken } from "../middleware/auth.js";
import express from "express";
const router = express.Router();

router.get("/", verifyToken, getDashboardData);

export default router;
