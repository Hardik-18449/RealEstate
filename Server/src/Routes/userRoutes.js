import express from "express";
import { registerUser, loginUser, updateProfile, getProfile } from "../Controllers/userController.js";
import { uploadUser } from "../Config/multerConfig.js";
import { verifyToken } from "../Middlewares/authMiddleware.js";

const router = express.Router();

// Existing routes
router.post("/register", uploadUser.single("image"), registerUser);
router.post("/login", loginUser);

// NEW: Add these to fix the 404
router.get("/profile", verifyToken, getProfile);
router.put("/update-profile", verifyToken, uploadUser.single("image"), updateProfile);

export default router;