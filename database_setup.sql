-- Create table for Sternberg experiment data
CREATE TABLE IF NOT EXISTS sternberg_attempts (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    trial_number INTEGER NOT NULL,
    memory_set_size INTEGER NOT NULL,
    probe_letter VARCHAR(1) NOT NULL,
    user_response BOOLEAN NOT NULL,
    correct_answer BOOLEAN NOT NULL,
    is_correct BOOLEAN NOT NULL,
    response_time_ms INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_username ON sternberg_attempts(username);
CREATE INDEX IF NOT EXISTS idx_created_at ON sternberg_attempts(created_at);
