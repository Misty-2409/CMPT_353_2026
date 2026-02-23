import { NextResponse } from "next/server";
import { users } from "../route";

// PUT update user
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await request.json();

  const user = users.find((u) => u.id === Number(id));

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  user.name = body.name;

  return NextResponse.json(user);
}

// DELETE user
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const index = users.findIndex((u) => u.id === Number(id));

  if (index === -1) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  users.splice(index, 1);

  return NextResponse.json({ message: "Deleted" }, { status: 200 });
}
