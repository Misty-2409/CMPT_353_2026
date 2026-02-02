'use strict';

/* =====================================================
   WEEK 3: IMPORT PACKAGES (already known)
   ===================================================== */

// Express → web server
const express = require('express');

// fs → file system (Week 3 used CALLBACKS)
const fs = require('fs');


/* =====================================================
   WEEK 4: PROMISE VERSION OF fs (NEW)
   ===================================================== */

   // path → helps build file paths safely (NEW explanation today)
const path = require('path');

// fs.promises gives Promise-based file functions
const fsPromises = fs.promises;

/* =====================================================
   WEEK 3: BASIC SERVER SETUP (already known)
   ===================================================== */

const app = express();
const PORT = 3002;
const HOST = '0.0.0.0';

app.use(express.json());
app.use(express.static('public'));
// SERVE HTML USING app.get (MANUAL) same as app.use(express.static('public'));
/*app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});*/


/* =====================================================
   WEEK 3 + WEEK 4: FILE PATH SETUP
   ===================================================== */

/*
  WHY do we need path?

  Different systems use different slashes:
  - Windows:   data\messages.txt
  - Linux/Mac: data/messages.txt

  path.join() builds the correct path automatically.
*/

const DATA_FILE = path.join(__dirname, 'data', 'messages.txt');

/* =====================================================
     WEEK 3 : CALLBACK-BASED FILE WRITE
   ===================================================== */

app.post('/message-callback', (req, res) => {
  const message = req.body.message;

  // CALLBACK: function runs LATER when file write finishes
  fs.appendFile(DATA_FILE, message + '\n', (err) => {

    // Error handling is trapped INSIDE callback
    if (err) {
      return res.status(500).send('Callback: write failed');
    }

    res.send('Callback: saved!');
  });
});

/* =====================================================
   WEEK 4 : PROMISES (.then / .catch)
   ===================================================== */

app.post('/message-promise', (req, res) => {
  const message = req.body.message;

  // appendFile returns a PROMISE
  fsPromises.appendFile(DATA_FILE, message + '\n')

    // runs when promise RESOLVES
    .then(() => {
      res.send('Promise: saved!');
    })

    // runs when promise REJECTS
    .catch(() => {
      res.status(500).send('Promise: write failed');
    });
});

/* =====================================================
    WEEK 4 : ASYNC / AWAIT (MODERN)
   ===================================================== */

app.post('/message-async', async (req, res) => {
  const message = req.body.message;

  try {
    // await pauses THIS function, not the server
    await fsPromises.appendFile(DATA_FILE, message + '\n');

    res.send('Async/Await: saved!');
  } catch (err) {
    res.status(500).send('Async/Await: write failed');
  }
});

/* =====================================================
   WEEK 3: START SERVER
   ===================================================== */

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
