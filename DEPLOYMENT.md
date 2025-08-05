# RoleVista Deployment Guide

## 🚀 Deploy to Vercel

### Prerequisites
- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Supabase project set up

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit - RoleVista with Supabase integration"

# Add your GitHub repository
git remote add origin https://github.com/yourusername/rolevista.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect it's a Vite project

### Step 3: Configure Environment Variables

In Vercel dashboard, go to your project → Settings → Environment Variables and add:

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_SUPABASE_URL` | `https://obvqbytibrbfrgibkioa.supabase.co` | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9idnFieXRpYnJiZnJnaWJraW9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0MDU4MzAsImV4cCI6MjA2OTk4MTgzMH0.Ihej-lawfC7vukT-ewBP_ljSRs7oY4VzC_MPqrb98iU` | Production, Preview, Development |

### Step 4: Deploy

1. Click "Deploy"
2. Vercel will build and deploy your app
3. You'll get a live URL like: `https://rolevista-xyz.vercel.app`

### Step 5: Update Supabase Settings

In your Supabase project:

1. Go to Authentication → Settings
2. Update **Site URL** to your Vercel URL: `https://rolevista-xyz.vercel.app`
3. Add **Redirect URLs**: `https://rolevista-xyz.vercel.app/**`

## 🔧 Local Development

1. Copy `.env.example` to `.env`
2. Add your Supabase credentials
3. Run `npm run dev`

## 📊 Database Schema

Make sure you've run the SQL schema in your Supabase project:

1. Go to Supabase Dashboard → SQL Editor
2. Run the schema provided in the migration guide
3. This creates all necessary tables and security policies

## 🔒 Security Notes

- ✅ Environment variables are properly configured
- ✅ Supabase keys are not exposed in code
- ✅ Row-level security (RLS) is enabled
- ✅ Only authenticated users can access their own data

## 🚨 Important

Never commit `.env` files to GitHub - they're already in `.gitignore` for security. 