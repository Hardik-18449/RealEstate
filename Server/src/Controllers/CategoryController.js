import { db } from "../Config/db.js";

export const getAllCategories = (req, res) => {
  db.query("SELECT * FROM categories", (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
};

export const addCategory = (req, res) => {
  const { name, slug } = req.body;
  const image = req.file ? req.file.filename : null;
  const query = "INSERT INTO categories (name, slug, image) VALUES (?, ?, ?)";
  db.query(query, [name, slug, image], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(201).json({ message: "Category created", id: result.insertId });
  });
};

export const updateCategory = (req, res) => {
  const { id } = req.params;
  const { name, slug } = req.body;
  const image = req.file ? req.file.filename : null;
  let query = "UPDATE categories SET name = ?, slug = ?";
  const params = [name, slug];
  if (image) { query += ", image = ?"; params.push(image); }
  query += " WHERE id = ?"; params.push(id);
  db.query(query, params, (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Category updated" });
  });
};

export const deleteCategory = (req, res) => {
  db.query("DELETE FROM categories WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Category deleted" });
  });
};