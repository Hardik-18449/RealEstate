import express from "express";
import { getAllProducts, getProductsByCategory, getProductBySlug, addProduct, updateProduct, deleteProduct } from "../Controllers/ProductController.js";
import { uploadProductImage } from "../Config/multerConfig.js";

const router = express.Router();

router.get("/all", getAllProducts);
router.get("/filter/:categorySlug", getProductsByCategory);
router.get("/details/:slug", getProductBySlug);
router.post("/add", uploadProductImage.single("image"), addProduct);
router.put("/update/:id", uploadProductImage.single("image"), updateProduct);
router.delete("/delete/:id", deleteProduct);

export default router;