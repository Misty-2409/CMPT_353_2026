// Import Next.js response helper
import { NextResponse } from "next/server";

// Import database functions
import { updateUser, deleteUser } from "@/lib/userQueries";


/*
-------------------------------------------------
  PUT /api/users/:id
  Updates a specific user
-------------------------------------------------
*/
export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {

  try {

    // In Next.js 16, params are async
    const { id } = await context.params;

    // Get request body
    const body = await request.json();

    // Call database function
    await updateUser(Number(id), body.name);

    return NextResponse.json(
      { message: "User updated successfully" }
    );

  } catch (error) {

    console.error("PUT Error:", error);

    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}


/*
-------------------------------------------------
  DELETE /api/users/:id
  Deletes a specific user
-------------------------------------------------
*/
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {

  try {

    const { id } = await context.params;

    await deleteUser(Number(id));

    return NextResponse.json(
      { message: "User deleted successfully" }
    );

  } catch (error) {

    console.error("DELETE Error:", error);

    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
