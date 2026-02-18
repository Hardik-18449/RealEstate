import { db } from "../Config/db.js";

export const findAdminByEmail = (email, callback) => {
  const query = "SELECT * FROM admins WHERE email = ?";
  db.query(query, [email], callback);
};
