"use client"

import { useState, useEffect } from "react"

type User = {
  id: string
  name: string
}

export default function UsersPage() {

  const [users, setUsers] = useState<User[]>([])
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [editId, setEditId] = useState<string | null>(null)

  async function loadUsers() {

    const res = await fetch("/api/users")
    const data = await res.json()

    setUsers(data)
  }

  useEffect(() => {
    loadUsers()
  }, [])

  async function addUser() {

    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name })
    })

    setId("")
    setName("")
    loadUsers()
  }

  async function deleteUser(id: string) {

    await fetch(`/api/users/${id}`, {
      method: "DELETE"
    })

    loadUsers()
  }

  async function updateUser() {

    if (!editId) return

    await fetch(`/api/users/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    })

    setEditId(null)
    setName("")
    loadUsers()
  }

  return (

    <div style={{ padding: "40px" }}>

      <h1>Users</h1>

      <h2>Add User</h2>

      <input
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={addUser}>Add User</button>

      {editId && (
        <button onClick={updateUser}>
          Update User
        </button>
      )}

      <h2>User List</h2>

      <ul>

        {users.map((user) => (

          <li key={user.id}>

            {user.id} - {user.name}

            <button
              onClick={() => {
                setEditId(user.id)
                setName(user.name)
              }}
            >
              Edit
            </button>

            <button
              onClick={() => deleteUser(user.id)}
            >
              Delete
            </button>

          </li>

        ))}

      </ul>

    </div>

  )
}
