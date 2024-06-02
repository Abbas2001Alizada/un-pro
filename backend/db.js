const express = require('express');
const app = express();
const port = 8000;

// Middleware to parse JSON
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Abbasjan123@',
  database: 'appointent'
});

// Test the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
    connection.release();
  }
});
// Create a new record
app.post('/users', (req, res) => {
    const { username, email } = req.body;
    pool.query('INSERT INTO users (username, email) VALUES (?, ?)', [username, email], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: results.insertId, username, email });
    });
  });
  
  // Read all records
  app.get('/users', (req, res) => {
    pool.query('SELECT * FROM users', (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  });
  
  // Read a single record by ID
  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    pool.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(results[0]);
    });
  });
  
  // Update a record by ID
  app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { username, email } = req.body;
    pool.query('UPDATE users SET username = ?, email = ? WHERE id = ?', [username, email, id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User updated successfully' });
    });
  });
  
  // Delete a record by ID
  app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    pool.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    });
  });
  