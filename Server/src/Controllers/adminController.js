import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "../Config/db.js";
import { findAdminByEmail } from "../Models/adminModel.js";

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    // Fetch admin from DB
    const result = await new Promise((resolve, reject) => {
      findAdminByEmail(email, (err, data) => {
        if (err) return reject(err);
        resolve(data);
      });
    });

    if (result.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const admin = result[0];

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

 
    const token = jwt.sign(
      { id: admin.id },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    res.json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
export const logoutAdmin = (req, res) => {

  res.clearCookie("token"); 
  res.json({ message: "Logout successful" });
};

