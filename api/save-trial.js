const { Pool } = require('pg');

// Database configuration
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

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
};
