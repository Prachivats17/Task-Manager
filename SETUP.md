# Local Setup Guide

Complete step-by-step guide to set up and run the Task Manager application locally.

## System Requirements

- **Node.js**: v14 or higher (v18+ recommended)
- **npm**: v6 or higher
- **MongoDB**: Local installation or MongoDB Atlas (free tier available)
- **Git**: For version control
- **Text Editor**: VS Code, WebStorm, or any code editor

## Installation Steps

### Step 1: Clone or Download the Project

```bash
# If using git
git clone https://github.com/your-username/task-manager.git
cd task-manager

# Or download and extract the ZIP file
```

### Step 2: Install Node.js and npm

**Windows:**
1. Visit https://nodejs.org/
2. Download LTS version
3. Run installer and follow prompts
4. Verify installation:
```bash
node --version
npm --version
```

**macOS:**
```bash
# Using Homebrew
brew install node

# Verify
node --version
npm --version
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt-get install nodejs npm

# Verify
node --version
npm --version
```

### Step 3: Set Up MongoDB

#### Option A: Local MongoDB Installation

**Windows:**
1. Download MongoDB Community Edition
2. Run the installer
3. Create data directory: `C:\data\db`
4. Start MongoDB service

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
curl https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

#### Option B: MongoDB Atlas (Cloud)

1. Visit https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Create a database user
5. Get connection string
6. Save for later use

### Step 4: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your settings
# Windows: notepad .env
# macOS/Linux: nano .env
```

**Edit backend/.env:**

```
# Local MongoDB
MONGODB_URI=mongodb://localhost:27017/task-manager

# OR MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster-name.mongodb.net/task-manager?retryWrites=true&w=majority

JWT_SECRET=your_super_secret_key_min_32_characters
PORT=5000
NODE_ENV=development
```

**Generate JWT_SECRET:**

```bash
# Windows PowerShell
([Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((1..32 | ForEach-Object {[char](Get-Random -Min 33 -Max 126)} | Sort-Object {Get-Random}) -join ''))) -replace '[+/=]', ''

# macOS/Linux
openssl rand -hex 32
```

**Start Backend Server:**

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Expected output:
```
Server running on port 5000
MongoDB connected successfully
```

### Step 5: Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Create .env.local file (optional)
# Only needed if backend is not on localhost:5000
echo "VITE_API_BASE_URL=http://localhost:5000/api" > .env.local
```

**Start Frontend Development Server:**

```bash
npm run dev
```

Expected output:
```
VITE v5.0.0  ready in 123 ms

➜  Local:   http://localhost:3000/
```

### Step 6: Verify Everything Works

1. Open browser to http://localhost:3000
2. You should see the login page
3. Click "Sign up" to create an account
4. Create test account:
   ```
   Name: Test User
   Email: test@example.com
   Password: password123
   ```
5. You should be redirected to dashboard

## Configuration Details

### Backend Configuration

#### Server Port
Default: `5000`
Change in `.env`: `PORT=3001`

#### MongoDB Connection
Local: `mongodb://localhost:27017/task-manager`
Atlas: `mongodb+srv://user:password@cluster.mongodb.net/database`

#### JWT Configuration
- Secret Key: Generate with openssl or python
- Expiration: 30 days (change in authController.js line 7)
- Algorithm: HS256 (default for jsonwebtoken)

#### Database Name
Default: `task-manager`
Create multiple databases for testing:
- `task-manager-dev`
- `task-manager-test`
- `task-manager-prod`

### Frontend Configuration

#### API Base URL
Default: `http://localhost:5000/api`
Change in `.env.local`: `VITE_API_BASE_URL=http://api.example.com`

#### Development Server Port
Default: `3000`
Change in `vite.config.js`: `port: 3000`

#### Build Output
Location: `frontend/dist/`
Created by: `npm run build`

## Project Structure Deep Dive

### Backend Directory Structure

```
backend/
├── controllers/         # Business logic
│   ├── authController.js
│   ├── projectController.js
│   └── taskController.js
├── models/             # Database schemas
│   ├── User.js
│   ├── Project.js
│   └── Task.js
├── routes/             # API endpoints
│   ├── authRoutes.js
│   ├── projectRoutes.js
│   └── taskRoutes.js
├── middleware/         # Express middleware
│   └── auth.js         # JWT verification
├── server.js           # Main server file
├── package.json        # Dependencies
├── .env.example        # Environment template
├── .gitignore          # Git ignore rules
└── railway.json        # Railway config
```

### Frontend Directory Structure

```
frontend/
├── src/
│   ├── components/     # Reusable components
│   │   ├── Navbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/        # State management
│   │   └── AuthContext.jsx
│   ├── pages/          # Page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Projects.jsx
│   │   └── Tasks.jsx
│   ├── api/            # API calls
│   │   └── api.js
│   ├── styles/         # CSS files
│   │   ├── index.css
│   │   ├── auth.css
│   │   ├── navbar.css
│   │   ├── dashboard.css
│   │   ├── projects.css
│   │   └── tasks.css
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── index.html          # HTML template
├── vite.config.js      # Vite config
├── package.json        # Dependencies
├── .gitignore          # Git ignore rules
└── railway.json        # Railway config
```

## Common Commands

### Backend Commands

```bash
cd backend

# Install dependencies
npm install

# Start development server (with hot reload)
npm run dev

# Start production server
npm start

# View all available scripts
npm run
```

### Frontend Commands

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# View all available scripts
npm run
```

## Database Management

### MongoDB Commands

```bash
# Connect to local MongoDB
mongosh

# View databases
show dbs

# Use task-manager database
use task-manager

# View collections
show collections

# View documents in collection
db.users.find()
db.projects.find()
db.tasks.find()

# Delete database
db.dropDatabase()
```

### Create Test Data

```javascript
// In MongoDB shell
use task-manager

// Create users
db.users.insertOne({
  name: "Admin User",
  email: "admin@example.com",
  password: "hashed_password",
  role: "admin"
})

// Create projects
db.projects.insertOne({
  name: "Test Project",
  description: "A test project",
  owner: ObjectId("user_id"),
  status: "active"
})
```

## Troubleshooting

### MongoDB Connection Errors

**Error**: `MongooseError: Cannot connect to MongoDB`

**Solutions**:
1. Ensure MongoDB is running:
   ```bash
   # Check if MongoDB is running
   mongosh
   ```
2. Verify connection string in .env
3. Check firewall settings
4. For Atlas: Ensure IP is whitelisted

### Port Already in Use

**Error**: `Port 5000 is already in use`

**Solution**:
```bash
# Find process using port (macOS/Linux)
lsof -i :5000

# Kill process
kill -9 <PID>

# Or change port in .env
PORT=5001
```

### npm install Failures

**Error**: `npm ERR! Cannot find module`

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules

# Reinstall
npm install
```

### Frontend Can't Connect to Backend

**Error**: `Failed to fetch` or CORS error

**Solution**:
1. Verify backend is running on correct port
2. Check VITE_API_BASE_URL in .env.local
3. Ensure backend CORS is configured
4. Clear browser cache and try again

### Build Errors

**Error**: `vite build` fails

**Solution**:
```bash
# Clear vite cache
rm -rf .vite
rm -rf dist

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try build again
npm run build
```

## Development Workflow

### 1. Start Backend

```bash
cd backend
npm run dev
```

### 2. Start Frontend (in new terminal)

```bash
cd frontend
npm run dev
```

### 3. Access Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/api/health

### 4. Make Changes

- **Backend**: Changes auto-reload with nodemon
- **Frontend**: Changes auto-reload with Vite

### 5. Test Features

1. Register new account
2. Create projects
3. Create tasks
4. Update task status
5. Add team members

## Performance Tips

1. **Use React DevTools** - Browser extension for debugging
2. **Check Network Tab** - Verify API calls in browser dev tools
3. **Monitor Console** - Watch for errors and warnings
4. **Database Indexes** - Add indexes for frequently queried fields
5. **Lazy Loading** - Load components only when needed
6. **Caching** - Cache API responses in development

## Security Best Practices

1. **Never commit .env** - Keep secrets out of git
2. **Use .env.example** - Template for environment variables
3. **Validate inputs** - Check data before processing
4. **Use HTTPS** - In production, always use HTTPS
5. **Update dependencies** - Run `npm update` regularly
6. **Secure JWT** - Use strong, random JWT_SECRET

## Next Steps

1. **Explore the code** - Understand the architecture
2. **Modify features** - Customize for your needs
3. **Add tests** - Create unit and integration tests
4. **Deploy** - Follow DEPLOYMENT_GUIDE.md
5. **Monitor** - Set up error tracking and logging

## Additional Resources

- **Node.js Docs**: https://nodejs.org/docs/
- **Express.js**: https://expressjs.com/
- **MongoDB Docs**: https://docs.mongodb.com/
- **React**: https://react.dev/
- **Vite**: https://vitejs.dev/
- **JWT**: https://jwt.io/

## Getting Help

1. Check error messages carefully
2. Review logs in terminal
3. Use browser developer tools
4. Search GitHub issues
5. Create new issue with details
6. Post on Stack Overflow with tags

---

**You're all set! Happy coding! 🚀**
