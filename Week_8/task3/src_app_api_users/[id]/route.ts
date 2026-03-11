import { NextResponse } from "next/server"
import { getDB } from "@/lib/couch"
import { User } from "@/types/user"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {

  const db = await getDB()

  const result = await db.list({ include_docs: true })

  const row = result.rows.find((r: any) => {
    const doc = r.doc as User
    return doc.user_id === params.id
  })

  if (!row) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const doc = row.doc as User

  return NextResponse.json({
    id: doc.user_id,
    name: doc.user_name
  })
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {

  const body = await request.json()

  const db = await getDB()

  const result = await db.list({ include_docs: true })

  const row = result.rows.find((r: any) => {
    const doc = r.doc as User
    return doc.user_id === params.id
  })

  if (!row) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const doc = row.doc as User

  const updatedUser: User = {
    ...doc,
    user_name: body.name
  }

  await db.insert(updatedUser)

  return NextResponse.json({ message: "User updated" })
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {

  const db = await getDB()

  const result = await db.list({ include_docs: true })

  const row = result.rows.find((r: any) => {
    const doc = r.doc as User
    return doc.user_id === params.id
  })

  if (!row) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const doc = row.doc as User

  await db.destroy(doc._id!, doc._rev!)

  return NextResponse.json({ message: "User deleted" })
}
