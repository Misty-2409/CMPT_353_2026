import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req: Request) {

  const { username, password } = await req.json();

  // check if user already exists
  const [rows]: any = await pool.query(
    "SELECT * FROM login_users WHERE name = ?",
    [username]
  );

  if (rows.length > 0) {
    return NextResponse.json(
      { error: "Username already exists" },
      { status: 400 }
    );
  }

  // password validation
  if (password.length < 4) {
    return NextResponse.json(
      { error: "Password must be at least 4 characters" },
      { status: 400 }
    );
  }

  if (!/\d/.test(password)) {
    return NextResponse.json(
      { error: "Password must contain at least 1 digit" },
      { status: 400 }
    );
  }

  // insert user
  await pool.query(
    "INSERT INTO login_users (name, password) VALUES (?, ?)",
    [username, password]
  );

  return NextResponse.json({ success: true });
}
