# 🚀 Deployment Guide

## 🌐 **Deployment Architecture**

- **Frontend**: Vercel (React app)
- **Backend**: Railway (Node.js + SQLite)
- **Database**: SQLite (persistent on Railway)

## 📋 **Prerequisites**

1. GitHub account with your code pushed
2. Vercel account ([vercel.com](https://vercel.com))
3. Railway account ([railway.app](https://railway.app))

## 🎯 **Step 1: Deploy Backend to Railway**

### **1.1 Create Railway Project**
1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Choose "Deploy from GitHub repo"
4. Select your `rolevista` repository
5. Choose "Deploy from the repo root"

### **1.2 Configure Environment Variables**
In Railway dashboard → Variables tab:
```bash
# Required Variables
JWT_SECRET=your-super-secure-256-bit-random-string-here
NODE_ENV=production
PORT=5000

# Optional Variables  
BCRYPT_SALT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### **1.3 Set Build Configuration**
Railway should auto-detect Node.js. If needed, configure:
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`
- **Root Directory**: `/` (repo root)

### **1.4 Get Backend URL**
After deployment, Railway will provide a URL like:
`https://your-project-name.up.railway.app`

**⚠️ Important**: Copy this URL - you'll need it for frontend deployment!

## 🎨 **Step 2: Deploy Frontend to Vercel**

### **2.1 Deploy via GitHub**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your `rolevista` repository
4. Configure project:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (repo root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### **2.2 Set Environment Variables**
In Vercel dashboard → Settings → Environment Variables:
```bash
# Replace with your Railway backend URL
VITE_API_URL=https://your-project-name.up.railway.app/api
REACT_APP_API_URL=https://your-project-name.up.railway.app/api
```

### **2.3 Deploy**
Click "Deploy" - Vercel will build and deploy your frontend!

## 🔗 **Step 3: Connect Frontend to Backend**

### **3.1 Update Backend CORS**
Update your backend's `server.js` file:
```javascript
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:4028',
  'http://localhost:4028',
  'https://your-vercel-app.vercel.app', // Add your Vercel URL here
];
```

### **3.2 Redeploy Backend**
Push changes to GitHub → Railway will auto-redeploy

## ✅ **Step 4: Test Your Deployment**

### **Backend Health Check**
```bash
curl https://your-project-name.up.railway.app/health
```
Should return: `{"status":"OK","timestamp":"...","service":"RoleVista Backend API"}`

### **Frontend Test**
1. Visit your Vercel URL: `https://your-app.vercel.app`
2. Try registering a new user
3. Take the career assessment
4. Verify data is being saved

## 🔧 **Custom Domain Setup (Optional)**

### **Frontend Domain**
1. Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS settings as instructed

### **Backend Domain**
1. Railway Dashboard → Settings → Domains
2. Add custom domain
3. Update frontend environment variables

## 🔄 **Continuous Deployment**

Both platforms support automatic deployment:
- **Push to `main` branch** → Auto-deploy both frontend and backend
- **Environment variables** persist across deployments
- **Database data** persists on Railway

## 📊 **Monitor Your Deployment**

### **Railway Monitoring**
- View logs in Railway dashboard
- Monitor CPU/Memory usage
- Check database size

### **Vercel Analytics**
- View deployment logs
- Monitor build times
- Check performance metrics

## 🚨 **Troubleshooting**

### **Common Issues**

1. **CORS Errors**
   - Ensure frontend URL is in backend's allowed origins
   - Check environment variables are set correctly

2. **Database Connection**
   - Railway automatically handles SQLite file persistence
   - Check backend logs for database initialization

3. **Environment Variables**
   - Verify all required variables are set
   - JWT_SECRET must be a secure random string

4. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are in package.json

### **Debug Commands**
```bash
# Check backend status
curl https://your-backend.up.railway.app/health

# View Railway logs
railway logs

# Test API endpoints
curl -X POST https://your-backend.up.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","password":"Password123","acceptTerms":true}'
```

## 🎉 **Success!**

Your RoleVista platform is now live!

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.up.railway.app`
- **Database**: Automatically managed on Railway

## 📈 **Next Steps**

1. **Set up monitoring** (error tracking, uptime monitoring)
2. **Configure backups** for your database
3. **Add analytics** to track user engagement
4. **Set up custom domains** for professional URLs
5. **Enable HTTPS** everywhere (automatic on both platforms)

---

🎯 **Your career assessment platform is now ready to help users discover their ideal careers!** 