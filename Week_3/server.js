'use strict'; 
// Enforces stricter JavaScript rules to avoid common mistakes

// Import the Express framework (used to create the server)
const express = require('express');

// Import the File System module (used to read/write files)
const fs = require('fs');

// Create an Express application
const app = express();

// Define the port number and host address where the server will run
const PORT = 3002;
const HOST = '0.0.0.0'; 

// -------------------------------
// BODY PARSER (middleware)
// -------------------------------
// Allows the server to read form data (application/x-www-form-urlencoded)
//if you have used a form on your .html/js to pass data
app.use(express.urlencoded({ extended: true }));
// Allows the server to read JSON data sent from fetch requests from html/js
app.use(express.json());

// -------------------------------
// SERVE STATIC FILES
// -------------------------------
// Serves HTML, CSS, and JS files from the "public" folder
// Example: public/index.html will load at http://localhost:8080
app.use(express.static('public'));

// -------------------------------
// POST ROUTE
// -------------------------------
// Listens for POST requests at /save-name
app.post('/save-name', (req, res) => {

  // Read the "name" value sent in the request body
  const name = req.body.name;

  // -------------------------------
  // FILE SYSTEM (fs)
// -------------------------------
  // Append the name to a file called "names.txt"
  // '\n' adds a new line after each name
  //if use docker ./data/names_new
  fs.appendFile('names.txt', name + '\n', err => {

    // If there is an error while writing the file
    if (err) {
      res.status(500).send('Error saving file');
      return;
    }

    // Send a success message back to the client
    res.send('Saved successfully!');
  });
});

// -------------------------------
// START THE SERVER
// -------------------------------
// Start listening for requests on the given port
app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
