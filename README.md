# 🎯 RoleVista - AI Career Assessment Platform

A comprehensive career assessment platform that helps users discover their ideal career path through AI-powered assessments based on Ikigai principles.

> **🚀 Live Demo:** RoleVista Career Assessment Platform

## 🏗️ **Architecture**

- **Frontend**: React 18 + Vite + Redux Toolkit + TailwindCSS
- **Backend**: Node.js + Express + SQLite
- **Authentication**: JWT-based auth system
- **Database**: SQLite with comprehensive user tracking

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js 16+ 
- npm or yarn

### **1. Clone & Install**
```bash
git clone <your-repo-url>
cd rolevista

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

### **2. Environment Setup**
```bash
# Backend environment (REQUIRED for security)
cd backend
cp .env.example .env

# Edit .env and change JWT_SECRET to a secure random string:
# JWT_SECRET=your-super-secure-random-string-here-32-chars-minimum
```

### **3. Start Services**
```bash
# Terminal 1: Start Backend
cd backend
npm start
# Backend runs on http://localhost:5000

# Terminal 2: Start Frontend  
cd ..
npm start
# Frontend runs on http://localhost:4028
```

## 🔒 **Security Setup (IMPORTANT)**

### **Before Deploying to Production:**

1. **Generate Secure JWT Secret**
   ```bash
   # Generate a secure 256-bit key
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Update Environment Variables**
   ```bash
   # backend/.env
   JWT_SECRET=your-generated-secure-key-here
   NODE_ENV=production
   ```

3. **Database Security**
   - SQLite database is in `backend/data/` (excluded from git)
   - Passwords are hashed with bcrypt (12 salt rounds)
   - JWT tokens expire in 24 hours

## 📊 **Database Schema**

### **Users Table**
- Names, emails, hashed passwords
- Profile completion tracking
- Premium status and verification

### **Assessment Sessions**
- Session tracking with UUIDs
- Progress monitoring
- Completion timestamps

### **Assessment Answers**
- Every user answer is stored
- Question text and selected options
- Timestamps for analytics

### **User Activities**
- Complete activity logging
- IP addresses and user agents
- Action tracking for insights

## 🎯 **Features**

### **User Management**
- ✅ Secure registration/login
- ✅ JWT authentication
- ✅ Profile management
- ✅ Activity tracking

### **Career Assessment**  
- ✅ 15+ comprehensive questions
- ✅ Real-time answer saving
- ✅ Progress tracking
- ✅ Ikigai-based analysis

### **Results & Analytics**
- ✅ Career archetype identification
- ✅ Skill analysis
- ✅ Role recommendations
- ✅ Personality profiling

## 📁 **Project Structure**

```
rolevista/
├── src/                    # React frontend
│   ├── components/         # Reusable UI components  
│   ├── pages/             # Page components
│   ├── store/             # Redux store & slices
│   ├── services/          # API service layer
│   └── utils/             # Utilities & validation
├── backend/               # Node.js backend
│   ├── routes/            # API route handlers
│   ├── config/            # Database configuration
│   ├── data/              # SQLite database (gitignored)
│   └── scripts/           # Database utilities
└── public/                # Static assets
```

## 🔧 **API Endpoints**

### **Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login  
- `POST /api/auth/logout` - User logout
- `GET /api/auth/verify` - Token verification

### **User Management**
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/activity` - User activity log

### **Assessments**
- `POST /api/assessments/start` - Start new assessment
- `POST /api/assessments/answer` - Save assessment answer
- `GET /api/assessments/progress/:id` - Get assessment progress  
- `POST /api/assessments/complete/:id` - Complete assessment
- `GET /api/assessments/history` - Assessment history

## 🚦 **Development**

### **Code Quality**
- ESLint configuration for React best practices
- Error boundaries for graceful failure handling
- Input validation with Zod schemas
- Proper TypeScript-style JSDoc comments

### **Performance**
- Lazy loading for all routes
- React.memo for expensive components
- useCallback for event handlers
- Optimized bundle splitting

### **Accessibility**
- ARIA labels and descriptions
- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatibility

## 🚨 **SECURITY CHECKLIST**

### **Before Pushing to GitHub:**
- ✅ `.env` files are in `.gitignore`
- ✅ Database files are excluded (`backend/data/`)
- ✅ JWT secrets are environment variables only
- ✅ No hardcoded passwords or keys
- ✅ Proper CORS configuration
- ✅ Rate limiting enabled

### **Before Production Deployment:**
- [ ] Generate secure JWT secret (256-bit)
- [ ] Set `NODE_ENV=production` 
- [ ] Configure HTTPS
- [ ] Set up database backups
- [ ] Configure error monitoring
- [ ] Set up logging aggregation
- [ ] Configure environment-specific CORS

## 📈 **Scaling Considerations**

### **Database Migration**
Currently uses SQLite for simplicity. For production scale:
- Migrate to PostgreSQL or MySQL
- Set up connection pooling
- Implement database migrations
- Add read replicas for scaling

### **Authentication**
- Consider OAuth providers (Google, LinkedIn)
- Implement refresh tokens
- Add session management
- Set up user roles/permissions

## 🤝 **Contributing**

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 **License**

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚡ **Quick Commands**

```bash
# Start development
npm run dev

# Run linting  
npm run lint

# Build for production
npm run build

# Start backend only
cd backend && npm start

# Initialize database
cd backend && npm run init-db
```

---

Built with ❤️ using React, Node.js, and modern web technologies.
