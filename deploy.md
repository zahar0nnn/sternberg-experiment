# Vercel Deployment Guide

## 🚀 Deploy to Vercel

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel
```

4. **Set Environment Variables:**
```bash
vercel env add DATABASE_URL
# Enter: postgresql://neondb_owner:npg_0DHgcXRdnoO8@ep-round-lake-ad9bn5fl-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

### Option 2: Deploy via GitHub

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Set environment variable `DATABASE_URL`

### Option 3: Deploy via Vercel Dashboard

1. **Zip the project files**
2. **Go to [vercel.com](https://vercel.com)**
3. **Click "New Project"**
4. **Upload the zip file**
5. **Set environment variable `DATABASE_URL`**

## 🔧 Environment Variables

Set this environment variable in Vercel:

```
DATABASE_URL=postgresql://neondb_owner:npg_0DHgcXRdnoO8@ep-round-lake-ad9bn5fl-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

## 📊 Database Setup

After deployment, run this SQL command in your Neon database:

```sql
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
```

## 🌐 Access Your App

Once deployed, your app will be available at:
- **Production URL**: `https://your-project-name.vercel.app`
- **Custom Domain**: If you have one configured

## 📝 Features

- ✅ Serverless API endpoints
- ✅ PostgreSQL database integration
- ✅ Static file serving
- ✅ CORS enabled
- ✅ Environment variable support
- ✅ Production optimized

## 🔍 API Endpoints

- `POST /api/save-trial` - Save trial data
- `GET /api/user-attempts/:username` - Get user attempts
- `GET /api/all-attempts` - Get all attempts
- `GET /api/statistics` - Get statistics
- `GET /api/average-results` - Get average results

## 🛠️ Local Development

```bash
npm install
npm start
```

Visit: `http://localhost:3000`
