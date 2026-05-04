# Deployment Guide - Railway

This guide provides step-by-step instructions to deploy the Task Manager application to Railway.

## Prerequisites

1. **GitHub Account** - Push your code to GitHub
2. **Railway Account** - Sign up at https://railway.app
3. **MongoDB Atlas Account** - Free tier available at https://www.mongodb.com/cloud/atlas

## Step 1: Prepare Code for Deployment

### 1.1 Create GitHub Repository

```bash
# Initialize git in your project root
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Task Manager Full Stack App"

# Add remote repository
git remote add origin https://github.com/your-username/task-manager.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 1.2 Create .env.example files (Already Done)

The `.env.example` files are already created for both backend and frontend with placeholder values.

## Step 2: Set Up MongoDB Atlas

### 2.1 Create MongoDB Database

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up or log in
3. Create a new cluster (Free tier available)
4. Create a database named "task-manager"
5. Create a database user with username and password
6. Get the connection string

### 2.2 Connection String Format

```
mongodb+srv://username:password@cluster-name.mongodb.net/task-manager?retryWrites=true&w=majority
```

Replace:
- `username`: Your MongoDB user
- `password`: Your MongoDB user password
- `cluster-name`: Your Atlas cluster name

## Step 3: Deploy on Railway

### 3.1 Create Railway Project

1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub"
5. Authorize Railway to access your GitHub account
6. Select your task-manager repository
7. Click "Deploy"

### 3.2 Configure Backend Service

Railway will auto-detect your monorepo structure. If not, follow these steps:

1. Click on "Backend Service" (or create new service)
2. Click the three dots menu → "Settings"
3. Set these values:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 3.3 Add Environment Variables to Backend

1. In Railway dashboard, click "Backend Service"
2. Go to "Variables" tab
3. Add these variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster-name.mongodb.net/task-manager?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
PORT=5000
NODE_ENV=production
```

⚠️ **Important**: Generate a strong JWT_SECRET
```bash
# Generate a secure random string
openssl rand -hex 32
```

### 3.4 Configure Frontend Service

1. Click "Add Service" → "Empty Service"
2. Name it "Frontend"
3. Click the three dots menu → "Settings"
4. Set these values:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run preview` or `npm run build && npm run preview`

### 3.5 Add Environment Variables to Frontend

1. In Railway dashboard, click "Frontend Service"
2. Go to "Variables" tab
3. Add this variable:

```
VITE_API_BASE_URL=https://backend-service-url.railway.app/api
```

Replace `backend-service-url` with your actual backend URL from Railway.

## Step 4: Add MongoDB Plugin (Optional)

If you want to use Railway's MongoDB plugin instead of Atlas:

1. In Railway project, click "Add"
2. Search for "MongoDB"
3. Click to add MongoDB plugin
4. It will automatically create the connection string
5. Copy the connection string and use it in backend environment variables

## Step 5: Connect Services

1. In Railway dashboard, select Backend Service
2. Go to "Variables" tab
3. Click on the MONGODB_URI variable
4. Reference the MongoDB service variable if using Railway's MongoDB

## Step 6: Deploy

1. All changes to the `main` branch on GitHub automatically trigger deployments
2. Watch the deployment logs in Railway dashboard
3. Once both services are "Running", your app is live!

## Step 7: Access Your App

### Frontend URL
- Railway provides a unique domain: `https://your-app-name.railway.app`
- Your frontend is accessible at this URL

### Backend API URL
- Backend is accessible at: `https://your-backend-name.railway.app/api`
- Test health endpoint: `https://your-backend-name.railway.app/api/health`

## Verification Checklist

- [ ] GitHub repository is set up and code is pushed
- [ ] Railway account is created
- [ ] Both Backend and Frontend services are created
- [ ] Environment variables are set correctly
- [ ] MongoDB connection is working
- [ ] Frontend can access backend API
- [ ] User registration works
- [ ] User login works
- [ ] Can create projects and tasks

## Troubleshooting

### Backend Service Won't Start

**Error**: `npm ERR! missing script: start`

**Solution**: Ensure `package.json` has `"start"` script defined. Backend should have:
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

### MongoDB Connection Error

**Error**: `MongooseError: Cannot connect to MongoDB`

**Solution**:
- Verify MONGODB_URI is correct
- Check MongoDB username/password
- Ensure database access is allowed from Railway IP
- In MongoDB Atlas, add `0.0.0.0/0` to IP whitelist (for testing only)

### CORS Errors

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**:
- Backend already has CORS configured
- Ensure frontend VITE_API_BASE_URL matches actual backend URL
- Restart both services

### Frontend Can't Connect to Backend

**Error**: `Failed to fetch` or `net::ERR_NAME_NOT_RESOLVED`

**Solution**:
- Update VITE_API_BASE_URL in frontend variables with correct backend URL
- Redeploy frontend after changing variables
- Check that backend service is running

### Deployment Stuck

**Solution**:
1. Check build logs in Railway
2. Ensure all dependencies are installed locally first
3. Verify Node.js version compatibility
4. Clear Railway cache and redeploy

## Post-Deployment

### 1. Test the Application

```bash
# Test health endpoint
curl https://your-backend-name.railway.app/api/health

# Test registration
curl -X POST https://your-backend-name.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 2. Monitor Application

1. In Railway dashboard, view:
   - Build logs
   - Deploy logs
   - Runtime logs
   - Metrics (CPU, Memory, Network)

### 3. Enable Error Tracking

Add error logging to backend for production monitoring.

### 4. Set Up Custom Domain (Optional)

1. In Railway project settings
2. Add custom domain
3. Update DNS records at your domain provider

## Environment Variables Reference

### Backend (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| MONGODB_URI | MongoDB connection string | mongodb+srv://user:pass@cluster.mongodb.net/db |
| JWT_SECRET | Secret key for JWT tokens | abc123def456... |
| PORT | Server port | 5000 |
| NODE_ENV | Environment mode | production |

### Frontend (.env.local)

| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_BASE_URL | Backend API URL | https://api.example.com/api |

## Next Steps

1. **Add Features**: Implement email notifications, task comments, file uploads
2. **Improve Security**: Add rate limiting, request validation
3. **Performance**: Add caching, database indexing optimization
4. **Monitoring**: Set up error tracking and analytics
5. **CI/CD**: Add automated tests and quality checks

## Support

For Railway-specific issues:
- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway

For Application Issues:
- Check GitHub Issues
- Review deployment logs
- Test API endpoints with tools like Postman

---

**Deployment successful! Your Task Manager app is now live! 🚀**
