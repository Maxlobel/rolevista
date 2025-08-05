# RoleVista Backend Migration to Supabase

This guide will help you migrate your RoleVista application from the Express.js + SQLite backend to Supabase.

## 🎯 Migration Overview

**What's Been Completed:**
- ✅ Created comprehensive Supabase authentication service
- ✅ Created Supabase assessment service with full functionality
- ✅ Created user profile management service
- ✅ Updated Redux auth slice to use Supabase
- ✅ Updated login components to use new authentication
- ✅ Database schema designed and ready for Supabase
- ✅ All backend functionality replicated in frontend services

**What You Need to Do:**
1. Set up Supabase project
2. Run database setup SQL
3. Configure environment variables
4. Update remaining pages to use new services
5. Remove backend dependencies

## 🚀 Step 1: Set Up Supabase Project

1. **Create Supabase Account**
   - Go to [supabase.com](https://supabase.com)
   - Sign up for a free account
   - Create a new project

2. **Get Project Credentials**
   - Go to Settings → API
   - Copy your project URL and anon key
   - You'll need these for environment variables

## 🗄️ Step 2: Set Up Database

1. **Go to SQL Editor** in your Supabase dashboard
2. **Run the following SQL** to create all tables and policies:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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
  profile_data JSONB DEFAULT '{}',
  preferences JSONB DEFAULT '{}',
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
  strengths_analysis JSONB,
  improvement_areas JSONB,
  detailed_analysis JSONB,
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User activity tracking table
CREATE TABLE public.user_activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  activity_type VARCHAR(50) NOT NULL,
  activity_description TEXT,
  metadata JSONB DEFAULT '{}',
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

-- Function to create user profile after signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, first_name, last_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create user profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## ⚙️ Step 3: Configure Environment Variables

Create a `.env` file in your project root (if you don't have one) and add:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace `your_supabase_project_url` and `your_supabase_anon_key` with the values from your Supabase project settings.

## 🔧 Step 4: Update Remaining Components

The following components still need to be updated to use the new Supabase services:

### 4.1 Registration Pages
Update `src/pages/register/components/RegistrationForm.jsx` to use the new auth service:

```javascript
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../store/slices/authSlice'

// Replace the mock registration with:
const result = await dispatch(registerUser({
  firstName: formData.firstName,
  lastName: formData.lastName,
  email: formData.email,
  password: formData.password,
  acceptTerms: formData.acceptTerms
}))
```

### 4.2 Assessment Pages
Update assessment components to use the new assessment service:

```javascript
import { assessmentService } from '../../../services/assessment'

// Replace API calls with service calls
const result = await assessmentService.startAssessment({ totalQuestions: 15 })
```

### 4.3 Dashboard and Profile Pages
Update to use the new user service:

```javascript
import { userService } from '../../../services/userService'

// Replace API calls with service calls
const profile = await userService.getUserProfile()
```

## 📦 Step 5: Install Dependencies

Make sure you have the Supabase client installed:

```bash
npm install @supabase/supabase-js
```

## 🗑️ Step 6: Remove Backend Dependencies

Once you've tested that everything works with Supabase:

1. **Stop the backend server**
2. **Remove backend folder** (optional, keep as backup initially)
3. **Update package.json** to remove backend-related scripts
4. **Update API service** to remove old endpoints

## 🎛️ Step 7: Configure Authentication Providers (Optional)

To enable social login (Google, GitHub, etc.):

1. Go to Authentication → Providers in Supabase
2. Enable the providers you want
3. Configure OAuth credentials for each provider
4. Update redirect URLs

## 🧪 Step 8: Testing

1. **Test Registration**: Create a new account
2. **Test Login**: Sign in with the account
3. **Test Assessment**: Complete an assessment flow  
4. **Test Profile**: Update user profile information
5. **Test Social Login**: If configured
6. **Test Password Reset**: Use forgot password functionality

## 🚀 Step 9: Deploy

When deploying to production:

1. **Environment Variables**: Set Supabase credentials in your hosting platform
2. **Domain Configuration**: Update Supabase authentication URLs
3. **Remove Backend**: Don't deploy the backend folder

## 🔄 Rollback Plan

If you need to rollback to the old backend:

1. Keep the backend folder intact during migration
2. Switch back environment variables to point to your backend API
3. Temporarily disable the Supabase auth middleware in the store

## 🆘 Common Issues & Solutions

### Issue: "Auth session is null"
**Solution**: Make sure environment variables are set correctly and the user is authenticated.

### Issue: RLS policy errors  
**Solution**: Double-check that all RLS policies are created and users are authenticated.

### Issue: Social login not working
**Solution**: Verify OAuth provider configuration in Supabase dashboard.

### Issue: Email verification not sending
**Solution**: Check Supabase email templates and SMTP configuration.

## 📋 Migration Checklist

- [ ] Supabase project created
- [ ] Database schema applied
- [ ] Environment variables configured
- [ ] Registration page updated
- [ ] Assessment pages updated  
- [ ] Dashboard pages updated
- [ ] Profile pages updated
- [ ] All functionality tested
- [ ] Social login configured (optional)
- [ ] Password reset tested
- [ ] Backend dependencies removed
- [ ] Production deployment updated

## 🎉 Benefits After Migration

- **No Backend Maintenance**: Supabase handles all backend infrastructure
- **Built-in Authentication**: Email/password, social login, MFA support
- **Real-time Features**: Easily add real-time updates
- **Automatic Backups**: Database backups handled by Supabase
- **Edge Functions**: Add serverless functions when needed
- **Better Performance**: Global CDN and optimized database
- **Cost Effective**: Pay only for what you use

---

## 🔗 Useful Links

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase React Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-react)

---

**Need Help?** If you encounter any issues during migration, the new services are designed to be drop-in replacements for your existing API calls. Each service method returns a consistent `{ success: boolean, data?: any, error?: string }` format for easy error handling. 