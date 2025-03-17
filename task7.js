const mysql = require('mysql');

// Create a database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bowling_db' // استبدل باسم قاعدة بياناتك
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the database successfully.');
});

module.exports = db;
// Import required modules
const express = require('express');
const db = require('./database'); // Import the database connection file

// Initialize Express app
const app = express();
const PORT = 3000;

// Middleware to parse JSON body
app.use(express.json());

/**
 * POST /scores - Players submit their bowling scores
 */
app.post('/scores', (req, res) => {
    const { player_name, score } = req.body;

    if (!player_name || !score) {
        return res.status(400).json({ error: 'Player name and score are required' });
    }

    const query = `INSERT INTO scores (player_name, score) VALUES (?, ?)`;
    db.query(query, [player_name, score], (err, result) => {
        if (err) {
            console.error('Error inserting score:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'Score added successfully', score_id: result.insertId });
    });
});

/**
 * GET /scores - Get the leaderboard (Top scores ranked from highest to lowest)
 */
app.get('/scores', (req, res) => {
    const query = `SELECT * FROM scores ORDER BY score DESC`;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching scores:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

/**
 * DELETE /scores/:id - Remove a player's score
 */
app.delete('/scores/:id', (req, res) => {
    const scoreId = req.params.id;

    const query = `DELETE FROM scores WHERE id = ?`;
    db.query(query, [scoreId], (err, result) => {
        if (err) {
            console.error('Error deleting score:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Score not found' });
        }
        res.json({ message: 'Score deleted successfully' });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});