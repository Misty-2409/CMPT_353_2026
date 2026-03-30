"use client";

import { useEffect, useState } from "react";

export default function WelcomePage() {

  const [username, setUsername] = useState("");

  useEffect(() => {
    // get cookie
    const cookies = document.cookie.split(";");

    for (let c of cookies) {
      const [key, value] = c.trim().split("=");

      if (key === "user") {
        setUsername(value);
      }
    }
  }, []);

  return (
    <div>
      <h2>Hello {username}</h2>
    </div>
  );
}
