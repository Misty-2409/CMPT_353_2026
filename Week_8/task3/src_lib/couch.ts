//Next.js API → getDB() → CouchDB
import nano from "nano"

const couch = nano(
  process.env.COUCHDB_URL || "http://admin:password@couchdb:5984"
)

const dbName = "usersdb"

export async function getDB() {

  const dbList = await couch.db.list()

  if (!dbList.includes(dbName)) {
    await couch.db.create(dbName)
  }

  return couch.db.use(dbName)
}
