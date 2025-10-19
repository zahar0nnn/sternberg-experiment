#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Sternberg Memory Task Experiment...\n');

// Check if dependencies are installed
const fs = require('fs');
if (!fs.existsSync('node_modules')) {
    console.log('📦 Installing dependencies...');
    const install = spawn('npm', ['install'], { stdio: 'inherit' });
    
    install.on('close', (code) => {
        if (code === 0) {
            console.log('✅ Dependencies installed successfully!\n');
            startServer();
        } else {
            console.error('❌ Failed to install dependencies');
            process.exit(1);
        }
    });
} else {
    startServer();
}

function startServer() {
    console.log('🗄️  Setting up database...');
    console.log('📊 Starting server on http://localhost:3000');
    console.log('🌐 Open your browser and go to: http://localhost:3000');
    console.log('📝 Make sure to run the database setup first:');
    console.log('   psql "postgresql://neondb_owner:npg_0DHgcXRdnoO8@ep-round-lake-ad9bn5fl-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" -f database_setup.sql\n');
    
    const server = spawn('node', ['server.js'], { stdio: 'inherit' });
    
    server.on('close', (code) => {
        console.log(`\n🛑 Server stopped with code ${code}`);
    });
    
    // Handle Ctrl+C
    process.on('SIGINT', () => {
        console.log('\n🛑 Shutting down server...');
        server.kill();
        process.exit(0);
    });
}
