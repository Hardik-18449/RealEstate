import express from "express";
import { validateAdminLogin } from "../Middlewares/validationMiddleware.js"; 
import { loginAdmin } from "../Controllers/adminController.js";

const router = express.Router();

router.post("/login", validateAdminLogin, loginAdmin);

export default router;
