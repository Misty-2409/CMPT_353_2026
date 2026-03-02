"use client";

import { useEffect, useState } from "react";

type UserPost = {
  id: number;
  name: string;
  title: string;
};

export default function UserPostsPage() {
  const [data, setData] = useState<UserPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user-posts")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>User Posts (JOIN Result)</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border={1} cellPadding={10}>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Post Title</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
