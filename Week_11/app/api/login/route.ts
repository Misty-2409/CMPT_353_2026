import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: Request) {

  // get data from frontend
  const { username, password } = await req.json();

  // check user in database
  const [rows]: any = await pool.query(
    "SELECT * FROM login_users WHERE name = ?",
    [username]
  );

  // if user not found
  if (rows.length === 0) {
    return NextResponse.json(
      { error: "username" },
      { status: 401 }
    );
  }

  const user = rows[0];

  // check password
  if (user.password !== password) {
    return NextResponse.json(
      { error: "password" },
      { status: 401 }
    );
  }

  // success
  return NextResponse.json({ success: true });
}
