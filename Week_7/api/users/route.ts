// Import Next.js response helper
import { NextResponse } from "next/server";

// Import database functions (separation of concerns)
import { 
  getAllUsers, 
  createUser, 
  initUsersTable 
} from "@/lib/userQueries";


/*
-------------------------------------------------
  GET /api/users
  Returns all users
-------------------------------------------------
*/
export async function GET() {

  try {

    // Ensure table exists before querying
    await initUsersTable();

    // Call database function
    const users = await getAllUsers();

    // Return JSON response
    return NextResponse.json(users);

  } catch (error) {

    console.error("GET Error:", error);

    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}


/*
-------------------------------------------------
  POST /api/users
  Creates a new user
-------------------------------------------------
*/
export async function POST(request: Request) {

  try {

    // Parse JSON body from client
    const body = await request.json();

    // Create user in database
    await createUser(body.name);

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );

  } catch (error) {

    console.error("POST Error:", error);

    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
