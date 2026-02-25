import express from "express";
import { getAllCategories, addCategory, updateCategory, deleteCategory } from "../Controllers/CategoryController.js";
import { uploadCategoryImage } from "../Config/multerConfig.js";

const router = express.Router();

router.get("/all", getAllCategories);
router.post("/add", uploadCategoryImage.single("image"), addCategory);
router.put("/update/:id", uploadCategoryImage.single("image"), updateCategory);
router.delete("/delete/:id", deleteCategory);

export default router;