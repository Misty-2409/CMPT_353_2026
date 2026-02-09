import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const app = express();
const PORT = 3002;
const HOST = "0.0.0.0";

app.use(cors());
app.use(express.json());

// ---- MySQL connection (no DB yet) ----
const connection = await mysql.createConnection({
  host: process.env.DB_HOST || "mysql1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "admin",
});

console.log("✅ Connected to MySQL server");

// ---- INIT: create DB + table ----
app.get("/init", async (_req, res) => {
  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS usersdb`);
    await connection.query(`USE usersdb`);
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      )
    `);
    res.send("✅ Database and table created");
  } catch (err) {
    console.error(err);
    res.status(500).send("Init failed");
  }
});

// ---- Get all users ----
app.get("/users", async (_req, res) => {
  await connection.query(`USE usersdb`);
  const [rows] = await connection.query(`SELECT * FROM users`);
  res.json(rows);
});

// ---- Add user ----
app.post("/users", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Name required" });

  await connection.query(`USE usersdb`);
  const [result] = await connection.execute<mysql.ResultSetHeader>(
    `INSERT INTO users (name) VALUES (?)`,
    [name]
  );

  res.status(201).json({ id: result.insertId, name });
});

// ---- Delete user ----
app.delete("/users/:id", async (req, res) => {
  await connection.query(`USE usersdb`);
  await connection.execute(`DELETE FROM users WHERE id=?`, [req.params.id]);
  res.sendStatus(204);
});

// ---- Start server ----
app.listen(PORT, HOST, () => {
  console.log(`🚀 Backend running at http://${HOST}:${PORT}`);
});
