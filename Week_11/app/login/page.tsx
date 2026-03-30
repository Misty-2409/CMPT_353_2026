"use client";

import { useState } from "react";

export default function LoginPage() {
  // store input values
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // store error messages
  const [userError, setUserError] = useState("");
  const [passError, setPassError] = useState("");

  const handleLogin = async () => {
    // clear old errors
    setUserError("");
    setPassError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    // handle errors
    if (!res.ok) {
      if (data.error === "username") {
        setUserError("Incorrect username");
      } else {
        setPassError("Incorrect password");
      }
      return;
    }

    // success → set cookie
    document.cookie = `user=${username}; path=/`;

    // redirect
   if (username === "admin") {
  window.location.href = "/users";   // admin goes here
} else {
  window.location.href = "/welcome";        // normal user
}
  };

  return (
    <div>
      <h2>Login</h2>

      {/* Username */}
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <span style={{ color: "red", marginLeft: "10px" }}>
        {userError}
      </span>

      <br /><br />

      {/* Password */}
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <span style={{ color: "red", marginLeft: "10px" }}>
        {passError}
      </span>

      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
