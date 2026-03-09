const express = require('express');
const bodyParser = require('body-parser');
const nano = require('nano');

const app = express();
app.use(bodyParser.json());

const PORT = 3002;
const HOST = '0.0.0.0';

/* CouchDB connection */
const COUCHDB_URL = process.env.COUCHDB_URL || 'http://admin:password@couchdb:5984';
const COUCHDB_DB = process.env.COUCHDB_DB || 'usersdb';

const couch = nano(COUCHDB_URL);

/* create database if not exists */
(async () => {
    const dbList = await couch.db.list();

    if (!dbList.includes(COUCHDB_DB)) {
        await couch.db.create(COUCHDB_DB);
        console.log("Database created:", COUCHDB_DB);
    } else {
        console.log("Database already exists:", COUCHDB_DB);
    }
})();

/* select database */
const usersDB = couch.db.use(COUCHDB_DB);

/* CREATE USER */
app.post('/users', async (req, res) => {

    const { id, name } = req.body;

    if (!id || !name) {
        return res.status(400).json({ error: "id and name required" });
    }

    try {

        const doc = await usersDB.insert({
            user_id: id,
            user_name: name
        });

        res.json({
            message: "User added",
            couch_id: doc.id
        });

    } catch (err) {

        res.status(500).json({ error: "Insert failed" });

    }

});

/* READ USERS */
app.get('/users', async (req, res) => {

    const result = await usersDB.list({ include_docs: true });

    const users = result.rows.map(row => ({
        id: row.doc.user_id,
        name: row.doc.user_name
    }));

    res.json(users);

});

/* UPDATE USER */
app.put('/users/:id', async (req, res) => {

  const userId = req.params.id;
  const { name } = req.body;

  try {

    const result = await usersDB.list({ include_docs: true });

    const userDoc = result.rows.find(row => row.doc.user_id == userId);

    if (!userDoc) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedDoc = {
      ...userDoc.doc,
      user_name: name
    };

    await usersDB.insert(updatedDoc);

    res.json({ message: "User updated" });

  } catch (err) {

    res.status(500).json({ error: "Update failed" });

  }

});

/* DELETE USER */
app.delete('/users/:id', async (req, res) => {

  const userId = req.params.id;

  try {

    const result = await usersDB.list({ include_docs: true });

    const userDoc = result.rows.find(row => row.doc.user_id == userId);

    if (!userDoc) {
      return res.status(404).json({ error: "User not found" });
    }

    await usersDB.destroy(userDoc.doc._id, userDoc.doc._rev);

    res.json({ message: "User deleted" });

  } catch (err) {

    res.status(500).json({ error: "Delete failed" });

  }

});

/* start server */
app.listen(PORT, HOST);

console.log(`Server running at http://${HOST}:${PORT}`);
