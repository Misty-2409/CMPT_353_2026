import express from "express";

const app = express();
const PORT = 3002;

// --------------------
// TypeScript type
// --------------------
type User = {
  id: number;
  name: string;
};

// --------------------
// Fake database (in memory)
// --------------------
let users: User[] = [
  { id: 1, name: "Ada" },
  { id: 2, name: "Alan" }
];

// --------------------
// Middleware
// --------------------
app.use(express.json());
app.use(express.static("public"));

// --------------------
// GET all users
// --------------------
app.get("/users", (req, res) => {
  res.json(users);
});

// --------------------
// ADD user
// --------------------
app.post("/users", (req, res) => {
  const newUser: User = {
    id: Date.now(),
    name: req.body.name
  };

  users.push(newUser);
  res.json(newUser);
});

// --------------------
// UPDATE user
// --------------------
app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).send("User not found");
  }

  user.name = req.body.name;
  res.json(user);
});

// --------------------
// DELETE user
// --------------------
app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  users = users.filter(u => u.id !== id);
  res.sendStatus(204);
});

// --------------------
// Start server
// --------------------
app.listen(PORT, () => {
  console.log("Server running at http://localhost:" + PORT);
});
