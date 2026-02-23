"use client";//If it behaves like normal React → you need "use client"
/*
When we need:
useState
useEffect
event handlers
interactivity
browser APIs
*/

import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
};

const API_URL = "http://localhost:3000/api";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");

  // Load users
  function loadUsers() {
    fetch(`${API_URL}/users`)
      .then(res => res.json())
      .then(data => setUsers(data));
  }

  useEffect(() => {
    loadUsers();
  }, []);

  // Add user
  function addUser() {
    if (!name) return;

    fetch(`${API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    }).then(() => {
      setName("");
      loadUsers();
    });
  }

  // Update user
  function updateUser(id: number) {
    const newName = prompt("New name:");
    if (!newName) return;

    fetch(`${API_URL}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName })
    }).then(loadUsers);
  }

  // Delete user
  function deleteUser(id: number) {
    fetch(`${API_URL}/users/${id}`, {
      method: "DELETE"
    }).then(loadUsers);
  }

  return (
    <div className="container">
      <h1>User Management</h1>

      <div className="input-section">
        <input
          value={name}
          placeholder="Enter name"
          onChange={e => setName(e.target.value)}
        />
        <button onClick={addUser}>Add User</button>
      </div>

      <ul className="user-list">
        {users.map(user => (
          <li key={user.id}>
            <span>{user.name}</span>
            <div>
              <button onClick={() => updateUser(user.id)}>Edit</button>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
