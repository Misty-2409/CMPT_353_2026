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
  const [username, setUsername] = useState(""); // WEEK 10 NEW
  
  // WEEK 10 NEW: logout
  function logout() {
  // delete cookie
  document.cookie =
    "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00";

  // redirect to login
  window.location.href = "/login";
}

  // Load users
  function loadUsers() {
    fetch(`${API_URL}/users`)
      .then(res => res.json())
      .then(data => setUsers(data));
  }

  // WEEK 10 NEW: check cookie before loading page
  useEffect(() => {
  const cookie = document.cookie;

  // extract user value
  const userCookie = cookie
    .split("; ")
    .find(row => row.startsWith("user="));

  if (!userCookie) {
    window.location.href = "/login";
    return;
  }

  const value = userCookie.split("=")[1];
  setUsername(value);

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

      {/* Week10: HEADER WITH LOGOUT */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <h1>User Management</h1>

        {username && (
          <button
            onClick={logout}
            style={{
              backgroundColor: "#e74c3c",
              color: "white",
              border: "none",
              padding: "6px 12px",
              cursor: "pointer",
              borderRadius: "5px"
            }}
          >
            Logout
          </button>
        )}
      </div>

      {/* Week:10 Welcome message */}
      <p style={{ marginBottom: "15px" }}>
        Welcome {username}
      </p>

      {/* INPUT SECTION */}
      <div className="input-section">
        <input
          value={name}
          placeholder="Enter name"
          onChange={e => setName(e.target.value)}
        />
        <button onClick={addUser}>Add User</button>
      </div>

      {/* USER LIST */}
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
