'use strict';

const express = require('express');

const HOST = '0.0.0.0';
const PORT = 3002;

const app = express();

/* --------------------
   NEW: serve HTML
--------------------- */
app.use(express.static('public')); 
//tells Express to serve static files (HTML, CSS, images, client-side JS)
// from a folder called public.
/*****
 * 
 * This HTML page lives on the server.
   Clicking a link sends a request.”
   The server runs JavaScript and sends a response.
 */

let count = 0;

app.get('/count', (req,res) => {
    count ++;
    res.send('The number of visit is: '+count);
});
app.get('/json_sample', (req,res) => {
    res.json(
        {visit:count}
    );
});
app.get('/reset', (req,res) => {
    const old_count = count;
    count = 0;
    //res.send(`old_count which is ${old_count} is initialized to ${count}`);
    res.json(
        {
            oldCount: old_count,
            newCount: count
        }
    );
});

app.listen(PORT, HOST, () => {
    console.log(`Server runnng on ${PORT} by host ${HOST}`);
});