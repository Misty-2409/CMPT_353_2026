import { useEffect, useState } from "react";
import type { User } from "./my_type/user_type";

const API_URL = "http://localhost:3002";
//const API_URL = "http://backend:3002";
//Inside Docker, localhost means inside the container

function App() {

  // --------------------
  // State (replaces DOM + variables)
  // --------------------

  // Stores the list of users (was userList <ul>)
  // check week 3's index.html for <ul id="userList"></ul>
  const [users, setUsers] = useState<User[]>([]);

  // Stores input value (was nameInput)
  // check week 3's index.html for <input id="nameInput" placeholder="Enter name" />
  const [name, setName] = useState("");

  // --------------------
  // LOAD users (replaces loadUsers())
  // --------------------
  function loadUsers() {
    fetch(`${API_URL}/users`)
      .then(res => res.json())
      .then(data => setUsers(data));
  }

  // Run loadUsers ONCE when page loads
  useEffect(() => {
    loadUsers();
  }, []);

  // --------------------
  // ADD user (replaces addUser())
  // --------------------
  function addUser() {
    if (!name) return;

    fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    }).then(() => {
      setName("");     // clear input
      loadUsers();     // refresh list
    });
  }

  // --------------------
  // UPDATE user (replaces updateUser())
  // --------------------
  function updateUser(id: number) {
    const newName = prompt("New name:");
    if (!newName) return;

    fetch(`${API_URL}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName })
    }).then(loadUsers);
  }

  // --------------------
  // DELETE user (replaces deleteUser())
  // --------------------
  function deleteUser(id: number) {
    fetch(`${API_URL}/users/${id}`, {
      method: "DELETE"
    }).then(loadUsers);
  }

  // --------------------
  // UI (replaces HTML + manual DOM updates)
  // --------------------
  return (
    <div style={{ padding: "20px" }}>
      <h1>User Management</h1>

      {/* Input field */}
      <input
        value={name}
        placeholder="Enter name"
        onChange={e => setName(e.target.value)}
      />

      {/* Add button */}
      <button onClick={addUser}>Add User</button>

      {/* User list */}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name}
            <button onClick={() => updateUser(user.id)}>Edit</button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
