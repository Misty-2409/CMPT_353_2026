import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "mysql",        // docker service name
  user: "root",
  password: "admin",
  database: "usersdb",
});

export default db;
