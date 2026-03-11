import { NextResponse } from "next/server"
import { getDB } from "@/lib/couch"
import { User } from "@/types/user"

export async function GET() {

  const db = await getDB()

  const result = await db.list({ include_docs: true })

  const users = result.rows.map((row: any) => {

    const doc = row.doc as User

    return {
      id: doc.user_id,
      name: doc.user_name
    }

  })

  return NextResponse.json(users)
}

export async function POST(request: Request) {

  const body = await request.json()

  const db = await getDB()

  const newUser: User = {
    user_id: body.id,
    user_name: body.name
  }

  const doc = await db.insert(newUser)

  return NextResponse.json({
    message: "User added",
    couch_id: doc.id
  })
}
