import db from "./db";  // ✅ default import

export async function getUsersWithPosts() {
  const [rows] = await db.query(`
    SELECT 
      users.id,
      users.name,
      posts.title
    FROM users
    INNER JOIN posts
      ON users.id = posts.user_id
  `);

  return rows;
}