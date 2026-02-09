import { useEffect, useState } from "react";
import type { User } from "./my_type/user_type";
/*
--------------------------------------------------------
API URL configuration
--------------------------------------------------------
*/
const API_URL = "http://localhost:3002";



// ------------------------------------------------------

function App() {
  // --------------------
  // State
  // --------------------
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");

  // --------------------
  // Load users from backend
  // --------------------
  const loadUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/users`);
      const data: User[] = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Failed to load users:", err);
    }
  };

  // Load users once when page loads
  useEffect(() => {
    loadUsers();
  }, []);

  // --------------------
  // Add a new user
  // --------------------
  const addUser = async () => {
    if (!name) return;

    await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    setName("");    // clear input
    loadUsers();    // refresh list
  };

  // --------------------
  // Delete a user
  // --------------------
  const deleteUser = async (id: number) => {
    await fetch(`${API_URL}/users/${id}`, {
      method: "DELETE",
    });

    loadUsers();    // refresh list
  };

  // --------------------
  // UI
  // --------------------
  return (
    <div style={{ padding: "20px" }}>
      <h1>Users</h1>

      {/* Add user input */}
      <input
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addUser}>Add</button>

      {/* Users list */}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => deleteUser(user.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
