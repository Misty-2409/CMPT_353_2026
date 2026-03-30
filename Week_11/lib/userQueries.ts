// Import the database connection pool
// This pool was created in db.ts and allows us to run SQL queries
import pool from "./db";


/*
-------------------------------------------------
  INIT FUNCTION
  Ensures the users table exists before using it
-------------------------------------------------
*/
export async function initUsersTable() {

  await pool.query(`
    DROP TABLE login_users
  `);

  // Create table if it does not already exist
  // login_users will store username + password
  await pool.query(`
    CREATE TABLE IF NOT EXISTS login_users (
      id INT AUTO_INCREMENT PRIMARY KEY,   -- unique id for each user
      name VARCHAR(255) NOT NULL,          -- username
      password VARCHAR(255) NOT NULL       -- password
    )
  `);

  // Insert default admin user
  // This runs every time, so it may create duplicates (we will fix later)
  await pool.query(`
    INSERT INTO login_users (name, password)
    VALUES ('admin', 'admin123')
  `);
}
