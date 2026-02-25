import { db } from "../Config/db.js";

export const findUserByEmail = (email, callback) => {
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], callback);
};

export const createUser = (user, callback) => {
  const sql = `
    INSERT INTO users (username, email, password, image)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [user.username, user.email, user.password, user.image],
    callback
  );
};
