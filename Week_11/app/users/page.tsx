import pool from "@/lib/db";

export default async function UsersPage() {

  // get all users from database
  const [rows]: any = await pool.query(
    "SELECT * FROM login_users"
  );

  return (
    <div>
      <h2>All Users</h2>

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((user: any) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
