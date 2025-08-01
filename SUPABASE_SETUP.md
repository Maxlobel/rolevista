# 🚀 Supabase Setup Guide for RoleVista

## Overview
RoleVista now uses Supabase as the backend database and authentication system. This guide will help you set up your Supabase project and configure the application.

## 📋 What You'll Get

✅ **Real User Authentication** - Email/password sign-up and sign-in  
✅ **Comprehensive User Profiles** - Name, email, phone, location, experience  
✅ **Assessment Tracking** - Every answer stored in database  
✅ **User Journey Analytics** - Track user behavior and progress  
✅ **Cross-device Access** - Users can access their data anywhere  
✅ **Admin Insights** - Foundation for user management dashboard  

## 🛠️ Step 1: Create Supabase Project

1. **Go to [supabase.com](https://supabase.com)** and create a free account
2. **Create a new project**:
   - Click "New Project"
   - Choose your organization
   - Name: `rolevista` or similar
   - Generate a strong database password
   - Select a region close to your users
   - Click "Create new project"

3. **Wait for setup** (2-3 minutes)

## 🔧 Step 2: Configure Database Tables

1. **Go to SQL Editor** in your Supabase dashboard
2. **Copy and paste** the following SQL schema (from `src/lib/supabase.js`):

```sql
-- Users table (extends Supabase auth.users)
CREATE TABLE public.user_profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  location VARCHAR(100),
  date_of_birth DATE,
  education_level VARCHAR(50),
  years_of_experience VARCHAR(20),
  current_role VARCHAR(100),
  industry VARCHAR(50),
  linkedin_url VARCHAR(255),
  profile_completion_percentage INTEGER DEFAULT 0,
  is_premium BOOLEAN DEFAULT FALSE,
  marketing_consent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assessment sessions table
CREATE TABLE public.assessment_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  session_status VARCHAR(20) DEFAULT 'in_progress',
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  total_questions INTEGER DEFAULT 15,
  answered_questions INTEGER DEFAULT 0,
  completion_percentage INTEGER DEFAULT 0,
  duration_minutes INTEGER,
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assessment answers table  
CREATE TABLE public.assessment_answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES public.assessment_sessions(id) NOT NULL,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  question_id VARCHAR(50) NOT NULL,
  question_text TEXT NOT NULL,
  question_type VARCHAR(30) NOT NULL,
  selected_option VARCHAR(100) NOT NULL,
  option_label VARCHAR(200) NOT NULL,
  option_description TEXT,
  answer_order INTEGER,
  time_spent_seconds INTEGER,
  answered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assessment results table
CREATE TABLE public.assessment_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id UUID REFERENCES public.assessment_sessions(id) NOT NULL,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  overall_score INTEGER,
  career_archetype VARCHAR(100),
  top_career_matches JSONB,
  skills_analysis JSONB,
  personality_traits JSONB,
  career_recommendations JSONB,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User activity tracking table
CREATE TABLE public.user_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  activity_type VARCHAR(50) NOT NULL,
  activity_description TEXT,
  metadata JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_sessions ENABLE ROW LEVEL SECURITY;  
ALTER TABLE public.assessment_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessment_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activities ENABLE ROW LEVEL SECURITY;

-- RLS Policies (users can only access their own data)
CREATE POLICY "Users can view own profile" ON public.user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.user_profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own sessions" ON public.assessment_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own sessions" ON public.assessment_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own sessions" ON public.assessment_sessions FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own answers" ON public.assessment_answers FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own answers" ON public.assessment_answers FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own results" ON public.assessment_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own results" ON public.assessment_results FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own activities" ON public.user_activities FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own activities" ON public.user_activities FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_assessment_sessions_user_id ON public.assessment_sessions(user_id);
CREATE INDEX idx_assessment_answers_session_id ON public.assessment_answers(session_id);
CREATE INDEX idx_assessment_answers_user_id ON public.assessment_answers(user_id);
CREATE INDEX idx_assessment_results_user_id ON public.assessment_results(user_id);
CREATE INDEX idx_user_activities_user_id ON public.user_activities(user_id);
CREATE INDEX idx_user_activities_created_at ON public.user_activities(created_at);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
```

3. **Click "Run"** to execute the SQL
4. **Verify tables** were created in the Table Editor

## 🔐 Step 3: Configure Authentication

1. **Go to Authentication > Settings** in Supabase
2. **Email Templates**:
   - Customize your confirmation email template
   - Set site URL to your domain (e.g., `https://rolevista.vercel.app`)
3. **URL Configuration**:
   - Site URL: `https://rolevista.vercel.app` (or your domain)
   - Redirect URLs: Add your domain URLs

## 🎯 Step 4: Get Your Credentials

1. **Go to Settings > API** in your Supabase dashboard
2. **Copy these values**:
   - **Project URL** (looks like: `https://your-project.supabase.co`)
   - **Anon public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## ⚙️ Step 5: Configure Your App

### Option A: Environment Variables (Recommended)

1. **Create `.env.local`** in your project root:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

2. **Restart your dev server**: `npm run dev`

### Option B: Direct Configuration

1. **Edit `src/lib/supabase.js`**:
```javascript
const supabaseUrl = 'https://your-project.supabase.co'
const supabaseAnonKey = 'your_anon_key_here'
```

## 🧪 Step 6: Test Your Setup

1. **Start your app**: `npm run dev`
2. **Go to**: `http://localhost:4028/auth`
3. **Try signing up** with a test email
4. **Check Supabase dashboard**:
   - Go to Authentication > Users (should see your test user)
   - Go to Table Editor > user_profiles (should see profile data)
   - Go to Table Editor > user_activities (should see registration activity)

## 📊 Step 7: Monitor Your Users

In your Supabase dashboard, you can now:

- **Authentication > Users**: See all registered users
- **Table Editor > user_profiles**: View complete user profiles
- **Table Editor > assessment_sessions**: Track assessment completions
- **Table Editor > assessment_answers**: See individual question responses
- **Table Editor > assessment_results**: View career recommendation results
- **Table Editor > user_activities**: Monitor user behavior and engagement

## 🚀 Production Deployment

When deploying to Vercel:

1. **Add environment variables** in Vercel dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

2. **Update site URL** in Supabase Authentication settings to your live domain

## 🔒 Security Features Included

- ✅ **Row Level Security (RLS)** - Users only see their own data
- ✅ **Email verification** - Users must verify email addresses  
- ✅ **Secure authentication** - JWT tokens with automatic refresh
- ✅ **Password requirements** - Minimum 8 characters
- ✅ **Activity tracking** - Monitor user actions for security

## 📈 Analytics & Insights

Your Supabase setup tracks:

- **User Registration Trends**: Sign-up patterns over time
- **Assessment Completion Rates**: How many users complete assessments
- **Career Match Patterns**: Most common career recommendations
- **User Engagement**: Login frequency and activity patterns
- **Profile Completion**: How much information users provide

## 🆘 Troubleshooting

**Error: "Invalid API key"**
- Check your `VITE_SUPABASE_ANON_KEY` is correct
- Restart your dev server after adding env vars

**Error: "Failed to create user profile"**
- Verify the SQL schema was executed correctly
- Check RLS policies are set up properly

**Users not receiving confirmation emails**
- Check email templates in Authentication > Settings
- Verify site URL is set correctly

**Need Help?**
- Check Supabase documentation: [supabase.com/docs](https://supabase.com/docs)
- Review error messages in browser console
- Check Supabase dashboard for error logs

## 🎉 You're All Set!

Once configured, your RoleVista app will have:
- Professional user authentication
- Comprehensive user profiles  
- Complete assessment tracking
- Real-time user analytics
- Cross-device data access
- Foundation for premium features

Your users can now:
1. **Sign up** with email/password + full profile
2. **Take assessments** with all answers saved
3. **View results** based on their actual responses
4. **Access data** from any device
5. **Build complete career profiles** over time 