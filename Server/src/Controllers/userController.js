import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../Config/db.js";
import { findUserByEmail, createUser } from "../Models/userModel.js";


import path from "path";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!username || !email || !password) {
  return res.status(400).json({ message: "All fields required" });
}

const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

if (!passwordRegex.test(password)) {
  return res.status(400).json({
    message:
      "Password must be at least 8 characters long and include 1 uppercase letter, 1 number, and 1 special character",
  });
}

    findUserByEmail(email, async (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      if (result.length > 0) return res.status(400).json({ message: "Email already registered" });
      

      const hashedPassword = await bcrypt.hash(password, 10);

      createUser(
        { username, email, password: hashedPassword, image },
        (err2, result2) => {
          if (err2) return res.status(500).json({ message: err2.message });

          const token = jwt.sign(
            { id: result2.insertId },
            config.jwt.secret,
            { expiresIn: config.jwt.expiresIn }
          );

          res.status(201).json({
            message: "User registered successfully",
            token,
          });
        }
      );
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }

};



// User Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if fields are empty
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    findUserByEmail(email, async (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      // 1. Check if Email exists in the database
      if (result.length === 0) {
        // Use 404 (Not Found) or 401, but the message is what matters for your frontend
        return res.status(404).json({ message: "Email not registered" });
      }

      const user = result[0];

      // 2. Check if Password matches
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        // Specific message for wrong password
        return res.status(401).json({ message: "Incorrect password" });
      }

      // 3. Success: Generate Token
      const token = jwt.sign(
        { id: user.id }, 
        config.jwt.secret, 
        { expiresIn: config.jwt.expiresIn }
      );

      // Return response
      res.json({
        message: "Login successful",
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          image: user.image
        }
      });
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add this to your userController.js
export const getProfile = (req, res) => {
  const userId = req.user.id; // From verifyToken middleware
  
  const query = "SELECT id, username, email, firstName, lastName, location, mobileNo, image FROM users WHERE id = ?";
  
  db.query(query, [userId], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.length === 0) return res.status(404).json({ message: "User not found" });
    
    res.json(result[0]);
  });
};

// Ensure updateProfile is exported and uses 'db'
export const updateProfile = (req, res) => {
  const userId = req.user.id;
  const { firstName, lastName, email, location, mobileNo } = req.body;
  const newImage = req.file ? req.file.filename : null;

  let query = "UPDATE users SET firstName = ?, lastName = ?, email = ?, location = ?, mobileNo = ?";
  let params = [firstName, lastName, email, location, mobileNo];

  if (newImage) {
    query += ", image = ?";
    params.push(newImage);
  }

  query += " WHERE id = ?";
  params.push(userId);

  db.query(query, params, (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Profile updated successfully" });
  });
};