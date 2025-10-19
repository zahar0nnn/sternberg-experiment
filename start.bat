@echo off
echo 🚀 Starting Sternberg Memory Task Experiment...
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo ❌ Failed to install dependencies
        pause
        exit /b 1
    )
    echo ✅ Dependencies installed successfully!
    echo.
)

echo 🗄️  Setting up database...
echo 📊 Starting server on http://localhost:3000
echo 🌐 Open your browser and go to: http://localhost:3000
echo 📝 Make sure to run the database setup first:
echo    psql "postgresql://neondb_owner:npg_0DHgcXRdnoO8@ep-round-lake-ad9bn5fl-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" -f database_setup.sql
echo.

node server.js

pause
