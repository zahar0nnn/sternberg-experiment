# Sternberg Memory Task Experiment

A web-based implementation of the Sternberg memory task experiment with PostgreSQL data storage.

## Setup Instructions

### 1. Database Setup
First, run the SQL script to create the table:

```bash
psql 'postgresql://neondb_owner:npg_0DHgcXRdnoO8@ep-round-lake-ad9bn5fl-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require' -f database_setup.sql
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Server
```bash
npm start
```

### 4. Open the Experiment
Open `index.html` in your web browser.

## Database Schema

The `sternberg_attempts` table stores:
- `username`: User's nickname
- `trial_number`: Trial number (1-5)
- `memory_set_size`: Number of letters in memory set (2-6)
- `probe_letter`: The letter being tested
- `user_response`: User's answer (true/false)
- `correct_answer`: Correct answer (true/false)
- `is_correct`: Whether user was correct
- `response_time_ms`: Response time in milliseconds
- `created_at`: Timestamp

## API Endpoints

- `POST /api/save-trial` - Save trial data
- `GET /api/user-attempts/:username` - Get attempts for specific user
- `GET /api/all-attempts` - Get all attempts
- `GET /api/statistics` - Get aggregated statistics

## Features

- 5 trials with increasing memory set sizes (2, 3, 4, 5, 6 letters)
- Response time tracking
- Keyboard support (comma for YES, period for NO)
- Interactive chart with hover tooltips
- PostgreSQL data storage
- Real-time data saving
