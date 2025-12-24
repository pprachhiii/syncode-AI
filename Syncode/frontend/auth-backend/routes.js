import express from "express";
import { signup, login } from "./controller.js";
import { verifyToken } from "./middleware.js";

const router = express.Router();

// Auth routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/me", verifyToken, (req, res) => {
  res.json({ user: req.user });
});

//protected route
// router.get("/upload", verifyToken, (req, res) => {
//   res.json({
//     message: "You are authorized to access this route",
//     user: req.user,
//   });
// });

export default router;
