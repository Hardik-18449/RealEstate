import express, { urlencoded } from "express";
import cors from "cors";
import adminRoutes from "./src/Routes/adminRoutes.js";
import categoryRoutes from "./src/Routes/categoryRoutes.js"; 
import { config, db } from "./src/Config/db.js";
import userRoutes from "./src/Routes/userRoutes.js";
import productRoutes from "./src/Routes/ProductRoutes.js"; // Standardized naming
import orderRoutes from "./src/Routes/orderRoutes.js";  

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));

// Static Files (Images)
app.use("/uploads", express.static("uploads"));

// --- ROUTE MOUNTING (The Fix) ---

// 1. Admin Auth & Logic
app.use("/api/admin", adminRoutes);

// 2. User Auth & Profile
app.use("/api/user", userRoutes);

// 3. Categories (Add/Update/Delete Categories ONLY)
app.use("/api/categories", categoryRoutes);

// 4. Products (Add/Update/Delete Products & Slug-based details)
app.use("/api/products", productRoutes);

// 5. Orders (User & Admin order management)
app.use("/api/orders", orderRoutes);

// --- ERROR HANDLING ---

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

// --- DATABASE CONNECTION & SERVER START ---

db.connect((err) => {
  if (err) {
    console.error("MySQL Database connection failed:", err.message);
    process.exit(1); 
  }
  console.log("MySQL Connected Successfully");

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
});