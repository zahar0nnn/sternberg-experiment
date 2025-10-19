const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Database configuration
const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_0DHgcXRdnoO8@ep-round-lake-ad9bn5fl-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
    ssl: { rejectUnauthorized: false }
});

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route to save trial data
app.post('/api/save-trial', async (req, res) => {
    try {
        const {
            username,
            trial_number,
            memory_set_size,
            probe_letter,
            user_response,
            correct_answer,
            is_correct,
            response_time_ms
        } = req.body;

        const query = `
            INSERT INTO sternberg_attempts 
            (username, trial_number, memory_set_size, probe_letter, user_response, correct_answer, is_correct, response_time_ms)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `;

        const values = [
            username,
            trial_number,
            memory_set_size,
            probe_letter,
            user_response,
            correct_answer,
            is_correct,
            response_time_ms
        ];

        await pool.query(query, values);
        res.json({ success: true, message: 'Trial data saved successfully' });
    } catch (error) {
        console.error('Error saving trial data:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Route to get all attempts for a user
app.get('/api/user-attempts/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const query = 'SELECT * FROM sternberg_attempts WHERE username = $1 ORDER BY trial_number';
        const result = await pool.query(query, [username]);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching user attempts:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Route to get all attempts (for analysis)
app.get('/api/all-attempts', async (req, res) => {
    try {
        const query = 'SELECT * FROM sternberg_attempts ORDER BY created_at DESC';
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching all attempts:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Route to get statistics
app.get('/api/statistics', async (req, res) => {
    try {
        const query = `
            SELECT 
                memory_set_size,
                AVG(response_time_ms) as avg_response_time,
                COUNT(*) as total_trials,
                SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as correct_trials,
                ROUND(SUM(CASE WHEN is_correct THEN 1 ELSE 0 END)::numeric / COUNT(*) * 100, 2) as accuracy_percentage
            FROM sternberg_attempts 
            GROUP BY memory_set_size 
            ORDER BY memory_set_size
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Route to get average results for all players
app.get('/api/average-results', async (req, res) => {
    try {
        const query = `
            SELECT 
                memory_set_size,
                AVG(response_time_ms) as avg_response_time,
                COUNT(*) as total_attempts
            FROM sternberg_attempts 
            GROUP BY memory_set_size 
            ORDER BY memory_set_size
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching average results:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Start server
const PORT = process.env.PORT || port;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Export for Vercel
module.exports = app;
