"use client";

import { useState } from "react";

export default function SignupPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setError("");

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    alert("Signup successful");

    // set cookie
    document.cookie = `user=${username}; path=/`;

    // go to welcome page
    window.location.href = "/welcome";
  };

  return (
    <div>
      <h2>Signup</h2>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <span style={{ color: "red" }}>{error}</span>
      <br /><br />

      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}
