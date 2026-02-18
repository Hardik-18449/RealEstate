import express from "express";
import cors from "cors";
import adminRoutes from "./src/Routes/adminRoutes.js"; 
import { config, db } from "./src/Config/db.js";


const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/admin", adminRoutes);


app.use((req, res, next) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

db.connect((err) => {
  if (err) {
    console.error("MySQL Database connection failed:", err.message);
    process.exit(1); 
  }
  console.log("MySQL Connected");

  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
});
