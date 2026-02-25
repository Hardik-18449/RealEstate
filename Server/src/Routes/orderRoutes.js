import express from "express";
import { 
    confirmOrder, 
    getMyOrders, 
    getAllOrdersAdmin, 
    updateOrderStatus 
} from "../Controllers/OrderController.js"; // Added .js extension

const router = express.Router();

// User Routes
router.post("/confirm", confirmOrder);
router.get("/my-orders/:email", getMyOrders);

// Admin Routes
router.get("/admin/all", getAllOrdersAdmin);
router.put("/admin/status/:id", updateOrderStatus);

export default router;