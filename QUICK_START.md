# Quick Start Guide

Get the Task Manager application up and running in 5 minutes!

## Prerequisites

- Node.js v14+ installed
- MongoDB running locally OR MongoDB Atlas account
- Git installed

## Super Quick Start

### 1. Clone & Install (1 minute)

```bash
# Clone the repository
git clone https://github.com/your-username/task-manager.git
cd task-manager

# Backend
cd backend && npm install && cd ..

# Frontend
cd frontend && npm install && cd ..
```

### 2. Configure MongoDB (1 minute)

**Local MongoDB:**
```bash
# Ensure MongoDB is running
mongosh
```

**MongoDB Atlas:**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create cluster and database
3. Get connection string

### 3. Setup Environment (1 minute)

```bash
# Backend configuration
cd backend
cp .env.example .env

# Edit .env:
# MONGODB_URI=mongodb://localhost:27017/task-manager
# JWT_SECRET=your-secret-key
# PORT=5000
```

### 4. Start Services (2 minutes)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 5. Access Application

Open browser: **http://localhost:3000**

## Test the App

1. **Register**
   ```
   Name: Test User
   Email: test@example.com
   Password: password123
   ```

2. **Create Project**
   - Click "Projects" → "New Project"
   - Fill in details → Create

3. **Create Task**
   - Click "Tasks" → "New Task"
   - Select project → Create

4. **Manage Tasks**
   - Update status using dropdown
   - View dashboard for statistics

## Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Ensure MongoDB is running: `mongosh` |
| Port 5000 in use | Change PORT in backend/.env to 5001 |
| npm install fails | Run `npm cache clean --force` then reinstall |
| Frontend can't connect | Ensure backend is running on port 5000 |

## File Structure

```
task-manager/
├── backend/          # Express API
│   ├── server.js     # Main server
│   ├── models/       # Database schemas
│   ├── controllers/  # Business logic
│   ├── routes/       # API endpoints
│   └── .env          # Configuration
├── frontend/         # React app
│   ├── src/
│   │   ├── pages/    # Login, Dashboard, etc
│   │   ├── components/
│   │   └── api/      # API calls
│   └── vite.config.js
└── README.md         # Full documentation
```

## Next Steps

1. **Read Full Documentation**: See `README.md`
2. **Local Development**: See `SETUP.md`
3. **Deploy on Railway**: See `DEPLOYMENT_GUIDE.md`
4. **Explore Features**: See `FEATURES.md`

## API Quick Reference

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@example.com",
    "password": "password123"
  }'

# Get projects (with auth token)
curl http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Database Access

```bash
# Connect to MongoDB
mongosh

# Switch to database
use task-manager

# View collections
show collections

# See all users
db.users.find()

# See all projects
db.projects.find()

# See all tasks
db.tasks.find()
```

## Default Ports

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **MongoDB**: localhost:27017 (local)

## Tech Stack Summary

| Component | Technology |
|-----------|-----------|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Database | MongoDB |
| Auth | JWT + bcryptjs |
| Styling | CSS3 |
| API | REST |

## Helpful Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# View available scripts
npm run

# Clear npm cache
npm cache clean --force

# Update all dependencies
npm update
```

## Quick Tips

1. **Use VS Code** for best development experience
2. **Install REST Client extension** for testing APIs
3. **Enable Dark Mode** for comfortable coding
4. **Use browser DevTools** for debugging frontend
5. **Check console logs** for errors

## Getting Help

- **Backend issues**: Check `backend/server.js` and `server.log`
- **Frontend issues**: Check browser console (F12)
- **Database issues**: Use `mongosh` to verify
- **API issues**: Test with curl or Postman

## Performance Tips

1. Keep MongoDB indexes on frequently queried fields
2. Use React DevTools for component profiling
3. Monitor network requests in browser DevTools
4. Check server logs for slow queries

## Security Reminders

1. ⚠️ Never commit `.env` file
2. ⚠️ Use strong `JWT_SECRET` in production
3. ⚠️ Update dependencies regularly: `npm update`
4. ⚠️ Validate all user inputs
5. ⚠️ Use HTTPS in production

## Video Tutorial (Optional)

Create a video showing:
1. Installation steps
2. Creating first project
3. Managing tasks
4. Viewing dashboard
5. Deploying to Railway

## Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Environment variables configured
- [ ] MongoDB set up (Atlas or Railway)
- [ ] Railway account created
- [ ] Services created and configured
- [ ] Health endpoint working
- [ ] Authentication working
- [ ] Live URL obtained

---

**That's it! You're ready to build! 🚀**

For detailed documentation, see:
- `README.md` - Complete reference
- `SETUP.md` - Detailed setup instructions
- `DEPLOYMENT_GUIDE.md` - Railway deployment
- `FEATURES.md` - Feature descriptions
