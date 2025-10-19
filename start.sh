#!/bin/bash

echo "🚀 Starting Sternberg Memory Task Experiment..."
echo

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
    echo "✅ Dependencies installed successfully!"
    echo
fi

echo "🗄️  Setting up database..."
echo "📊 Starting server on http://localhost:3000"
echo "🌐 Open your browser and go to: http://localhost:3000"
echo "📝 Make sure to run the database setup first:"
echo "   psql 'postgresql://neondb_owner:npg_0DHgcXRdnoO8@ep-round-lake-ad9bn5fl-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require' -f database_setup.sql"
echo

node server.js
