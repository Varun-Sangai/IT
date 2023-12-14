const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Set up MySQL connection
const db = mysql.createConnection({
  host: 'your-mysql-host',
  user: 'your-mysql-username',
  password: 'your-mysql-password',
  database: 'your-mysql-database',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Middleware to parse incoming requests with JSON payloads
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (like HTML)
app.use(express.static('public'));

// Endpoint for handling sign-in requests
app.post('/signin', (req, res) => {
  const { username, password } = req.body;

  // Query to check credentials in the database
  const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
  db.query(query, [username, password], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      // Successful sign-in
      res.send('Welcome!');
    } else {
      // Invalid credentials
      res.status(401).send('Invalid username or password');
    }
  });
});

// Endpoint for handling sign-up requests
app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // Query to insert new user into the database
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(query, [username, password], (err) => {
    if (err) throw err;

    // Successful sign-up
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
