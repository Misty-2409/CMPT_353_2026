import { NextResponse } from "next/server";

// Shared in-memory data
export let users = [
  { id: 1, name: "Ada" },
  { id: 2, name: "Alan" }
];

// GET all users
export async function GET() {
  return NextResponse.json(users);
}

// POST create new user
export async function POST(request: Request) {
  const body = await request.json();

  const newUser = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    name: body.name,
  };

  users.push(newUser);

  return NextResponse.json(newUser, { status: 201 });
}
