import dotenv from "dotenv";
import mysql from "mysql2";

dotenv.config();


export const config = {
  port: process.env.PORT || 5000,

  jwt: {
    secret: process.env.JWT_SECRET || "your_jwt_secret",
    expiresIn: process.env.JWT_EXPIRES || "1d",
  },

  db: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "admin_dashboard",
  },
};

export const db = mysql.createConnection(config.db);

db.connect((err) => {
  if (err) {
    console.error("MySQL Database connection failed:", err.message);
    process.exit(1);
  }
  console.log("MySQL Connected");
});
