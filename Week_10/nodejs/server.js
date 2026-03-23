// ===============================
// IMPORT PACKAGES
// ===============================
const express = require('express');          // Web framework
const cookieParser = require('cookie-parser'); // Read cookies
const sessions = require('express-session'); // Session management
const bcrypt = require('bcrypt');            // Password hashing
const fs = require('fs');                    // File system

// ===============================
// INITIALIZE APP
// ===============================
const app = express();
const PORT = 3002;

// ===============================
// MIDDLEWARE
// ===============================

// Parse form data (IMPORTANT for form submission)
app.use(express.urlencoded({ extended: true }));

// Parse JSON (optional, for APIs)
app.use(express.json());

// Enable cookie parsing
app.use(cookieParser());

// Configure session
app.use(sessions({
    secret: "my secret",        // secret key for encryption
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }  // false because we use localhost
}));

// ===============================
// USER FILE PATH
// ===============================
const USERS_FILE = './users.json';

// ===============================
// HELPER: GET USERS FROM FILE
// ===============================
function getUsers() {
    if (!fs.existsSync(USERS_FILE)) {
        return [];
    }

    const data = fs.readFileSync(USERS_FILE, 'utf-8');

    if (!data) return [];

    return JSON.parse(data);
}

// ===============================
// HELPER: SAVE USERS
// ===============================
function saveUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// ===============================
// REGISTER ROUTE
// ===============================
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Check input
    if (!username || !password) {
        return res.send("Username and password required");
    }

    const users = getUsers();

    // Check if user already exists
    const exists = users.find(u => u.username === username);
    if (exists) {
        return res.send("User already exists");
    }

    // Hash password (security)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    users.push({
        username,
        password: hashedPassword
    });

    saveUsers(users);

    // Auto login after register
    req.session.user = username;

    // Redirect to protected page
    res.redirect('/home.html');
});

// ===============================
// LOGIN ROUTE
// ===============================
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const users = getUsers();

    const user = users.find(u => u.username === username);

    //USER NOT FOUND → redirect with message
    if (!user) {
        return res.redirect('/home.html?msg=register');
    }

    const match = await bcrypt.compare(password, user.password);

    if (match) {
        req.session.user = username;

        // SUCCESS
        return res.redirect('/home.html?msg=welcome');
    }

    // WRONG PASSWORD
    res.redirect('/home.html?msg=register');
});

// ===============================
// PROTECTED PAGE ROUTE
// ===============================
app.get('/home.html', (req, res) => {

    // If not logged in → block access
    if (!req.session.user) {
        return res.redirect('/');
    }

    // If logged in → allow access
    res.sendFile(__dirname + '/public/home.html');
});

// ===============================
// LOGOUT ROUTE
// ===============================
app.get('/logout', (req, res) => {

    // Destroy session
    req.session.destroy(() => {

        // Redirect back to login page
        res.redirect('/');
    });
});

// ===============================
// SERVE FRONTEND FILES
// ===============================
app.use('/', express.static('public'));

// ===============================
// START SERVER
// ===============================
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
