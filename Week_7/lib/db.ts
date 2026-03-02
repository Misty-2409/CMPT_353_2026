// Import mysql2 library (promise version)
// This allows us to use async/await instead of callbacks
import mysql from "mysql2/promise";


// Create a connection pool
// A pool manages multiple database connections efficiently
// Instead of opening/closing a connection every time,
// the pool reuses connections (better performance)
const pool = mysql.createPool({

  // Where is the database running?
  // If running locally → "localhost"
  // If running inside Docker → service name (e.g., "mysql")
  host: "mysql",

  // Database username// use your username
  user: "root",

  // Database password// use your password. this password is set on my db
  password: "admin",

  // Which database to use // use your dbname
  database: "usersdb",
});


// Export the pool so other files can use it
// Example: userQueries.ts can import this and run queries
export default pool;
