const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// create MySQL connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// route for login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    console.log('warn: require username and password');
    return res.status(400).json({ error: 'require username and password' });
  }

  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.log('error: mysql query error');
      return res.status(500).json({ error: 'mysql query error' , err});
    }
    if (results.length > 0) {
      console.log('success');
      res.status(200).json({ message: 'backend: Success', isLogin: true });
    } else {
    //   console.log([username, password]);
      res.status(200).json({ message: 'backend: Incorret username or password' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
