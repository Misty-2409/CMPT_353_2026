// Import the database connection pool
// This pool was created in db.ts
import pool from "./db";


/*
-------------------------------------------------
  INIT FUNCTION
  Ensures the users table exists before using it
-------------------------------------------------
*/
export async function initUsersTable() {

  // This SQL checks:
  // If the table does not exist → create it
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    )
  `);
}


/*
-------------------------------------------------
  GET ALL USERS
  Retrieves all rows from users table
-------------------------------------------------
*/
export async function getAllUsers() {

  // Run SELECT query
  // pool.query returns an array:
  // [rows, fields]
  const [rows] = await pool.query("SELECT * FROM users");

  // Return only rows (actual data)
  return rows;
}


/*
-------------------------------------------------
  CREATE NEW USER
-------------------------------------------------
*/
export async function createUser(name: string) {

  // INSERT using prepared statement
  // ? prevents SQL injection
  const [result] = await pool.query(
    "INSERT INTO users (name) VALUES (?)",
    [name]   // replaces ?
  );

  return result;
}


/*
-------------------------------------------------
  UPDATE USER
-------------------------------------------------
*/
export async function updateUser(id: number, name: string) {

  // Update user where id matches
  await pool.query(
    "UPDATE users SET name = ? WHERE id = ?",
    [name, id]
  );
}


/*
-------------------------------------------------
  DELETE USER
-------------------------------------------------
*/
export async function deleteUser(id: number) {

  // Delete user where id matches
  await pool.query(
    "DELETE FROM users WHERE id = ?",
    [id]
  );
}