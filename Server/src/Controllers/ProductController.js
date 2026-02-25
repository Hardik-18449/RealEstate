import { db } from "../Config/db.js";

export const getAllProducts = (req, res) => {
  // We explicitly name the image column 'productImage' to match the Admin Table
  const query = `
    SELECT 
      s.id, 
      s.name, 
      s.slug, 
      s.price, 
      s.image AS productImage, 
      c.name AS category 
    FROM subcategories s
    JOIN categories c ON s.category_id = c.id
    ORDER BY s.id DESC
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
};
// src/Controllers/ProductController.js
export const getProductsByCategory = (req, res) => {
  const { categorySlug } = req.params;

  const query = `
    SELECT 
      s.id AS _id, 
      s.name AS title,      
      s.slug, 
      s.price, 
      s.image, 
      c.name AS brand      
    FROM subcategories s
    JOIN categories c ON s.category_id = c.id
    WHERE c.slug = ?
  `;

  db.query(query, [categorySlug], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
};

// src/Controllers/ProductController.js
export const getProductBySlug = (req, res) => {
  const { slug } = req.params;

  const query = `
    SELECT 
      s.*, 
      s.name AS title,     
      c.name AS brand       
    FROM subcategories s
    LEFT JOIN categories c ON s.category_id = c.id
    WHERE s.slug = ?
  `;

  db.query(query, [slug], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    if (result.length === 0) return res.status(404).json({ message: "Product not found" });
    res.json(result[0]);
  });
};

export const addProduct = (req, res) => {
  const { name, slug, category_id, price } = req.body;
  const image = req.file ? req.file.filename : null;
  const query = "INSERT INTO subcategories (name, slug, category_id, price, image) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [name, slug, category_id, price, image], (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(201).json({ message: "Product added" });
  });
};

export const updateProduct = (req, res) => {
  const { name, slug, category_id, price } = req.body;
  const image = req.file ? req.file.filename : null;
  let query = "UPDATE subcategories SET name = ?, slug = ?, category_id = ?, price = ?";
  const params = [name, slug, category_id, price];
  if (image) { query += ", image = ?"; params.push(image); }
  query += " WHERE id = ?"; params.push(req.params.id);
  db.query(query, params, (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Product updated" });
  });
};

export const deleteProduct = (req, res) => {
  db.query("DELETE FROM subcategories WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Product deleted" });
  });
};