# Team Task Manager - Full Stack Application

A comprehensive web application for managing projects and tasks with role-based access control, built with Node.js, Express, MongoDB, and React.

## 🌐 Live Demo

**[Live URL - Coming Soon]** (Deploy on Railway after setup)

## ✨ Features

### Authentication & Authorization
- **User Registration & Login** with JWT tokens
- **Role-Based Access Control** (Admin/Member)
- **Secure password** hashing with bcryptjs

### Project Management
- **Create & Manage Projects** with descriptions
- **Team Member Management** - Add/Remove members with roles
- **Project Status Tracking** (Active/Completed/Archived)

### Task Management
- **Create, Assign & Track Tasks** across projects
- **Task Status Management** (To Do/In Progress/Completed)
- **Priority Levels** (Low/Medium/High)
- **Due Dates & Overdue Detection**
- **Overdue Task Alerts**

### Dashboard
- **Overview Stats** - Total projects, tasks, completed tasks
- **Task Analytics** - In progress, overdue, and personal task counts
- **Quick Actions** - Easy access to projects and tasks

## 🏗️ Project Structure

```
task-manager/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Task.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   └── taskController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── projectRoutes.js
│   │   └── taskRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Projects.jsx
│   │   │   └── Tasks.jsx
│   │   ├── api/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   ├── index.css
│   │   │   ├── auth.css
│   │   │   ├── navbar.css
│   │   │   ├── dashboard.css
│   │   │   ├── projects.css
│   │   │   └── tasks.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (Local or Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env` file**
```bash
cp .env.example .env
```

4. **Configure environment variables**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/task-manager?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_in_production
PORT=5000
NODE_ENV=development
```

5. **Start the server**
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create `.env.local` file** (optional, for custom API URL)
```
VITE_API_BASE_URL=http://localhost:5000/api
```

4. **Start the development server**
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📚 API Documentation

### Authentication Endpoints

#### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```
GET /api/auth/me
Authorization: Bearer <token>
```

### Project Endpoints

#### Get All Projects
```
GET /api/projects
Authorization: Bearer <token>
```

#### Create Project
```
POST /api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Project Name",
  "description": "Project description"
}
```

#### Update Project
```
PUT /api/projects/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "description": "Updated description",
  "status": "active"
}
```

#### Delete Project
```
DELETE /api/projects/:id
Authorization: Bearer <token>
```

#### Add Member to Project
```
POST /api/projects/:id/members
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "user_id",
  "role": "member"
}
```

### Task Endpoints

#### Get All Tasks
```
GET /api/tasks?status=todo&projectId=project_id
Authorization: Bearer <token>
```

#### Create Task
```
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Task Title",
  "description": "Task description",
  "projectId": "project_id",
  "priority": "high",
  "dueDate": "2024-12-31"
}
```

#### Update Task
```
PUT /api/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "in-progress",
  "priority": "medium"
}
```

#### Delete Task
```
DELETE /api/tasks/:id
Authorization: Bearer <token>
```

#### Get Dashboard Stats
```
GET /api/tasks/dashboard/stats
Authorization: Bearer <token>
```

## 🔒 Security Features

1. **Password Hashing** - Bcryptjs with salt rounds
2. **JWT Authentication** - Secure token-based auth
3. **Role-Based Access Control** - Admin and Member roles
4. **Protected Routes** - Frontend route protection
5. **Database Validation** - Input validation on all endpoints
6. **CORS Configuration** - Secure cross-origin requests

## 🌐 Deployment on Railway

### Prerequisites
- Railway account (https://railway.app)
- GitHub account with repository

### Deployment Steps

1. **Create GitHub Repository**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **Connect to Railway**
- Log in to Railway
- Click "New Project"
- Select "Deploy from GitHub"
- Choose your repository
- Configure project settings

3. **Set Up Services**

#### MongoDB Service
- Add MongoDB plugin from Railway
- Copy connection string

#### Backend Service
- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Environment variables:
  - `MONGODB_URI`: From MongoDB service
  - `JWT_SECRET`: Generate a strong secret
  - `NODE_ENV`: production

#### Frontend Service
- Root directory: `frontend`
- Build command: `npm run build`
- Start command: `npm run preview`
- Environment variables:
  - `VITE_API_BASE_URL`: Backend service URL

4. **Configure Domain**
- Railway generates a domain automatically
- Link your custom domain (optional)

## 📝 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (admin/member),
  createdAt: Date
}
```

### Project Model
```javascript
{
  name: String,
  description: String,
  owner: ObjectId (User),
  members: [{
    user: ObjectId (User),
    role: String (admin/member)
  }],
  status: String (active/completed/archived),
  createdAt: Date,
  updatedAt: Date
}
```

### Task Model
```javascript
{
  title: String,
  description: String,
  project: ObjectId (Project),
  assignedTo: ObjectId (User),
  status: String (todo/in-progress/completed),
  priority: String (low/medium/high),
  dueDate: Date,
  createdBy: ObjectId (User),
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing

### Register New User
1. Go to http://localhost:3000/register
2. Fill in your details
3. You'll be redirected to dashboard

### Create a Project
1. Go to Projects page
2. Click "New Project"
3. Fill in project details
4. Project is created with you as admin

### Create and Manage Tasks
1. Go to Tasks page
2. Click "New Task"
3. Select project and fill task details
4. Update task status using dropdown
5. View overdue tasks with warning badge

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Utilities**: CORS, dotenv

### Frontend
- **Library**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: CSS3
- **State Management**: React Context API

## 📋 Environment Variables

### Backend (.env)
```
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>
PORT=5000
NODE_ENV=development
```

### Frontend (.env.local)
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created as a Full Stack Task Manager Application

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify MongoDB URI is correct
- Ensure MongoDB service is running
- Check firewall settings

### JWT Token Errors
- Clear browser localStorage
- Generate new JWT_SECRET in .env
- Re-login to get new token

### CORS Errors
- Verify backend CORS is configured
- Check API endpoint URLs
- Ensure backend is running

### Build Issues
- Delete node_modules and package-lock.json
- Run `npm install` again
- Clear vite cache

## 📞 Support

For issues or questions, please create an issue in the GitHub repository.

---

**Happy Task Managing! 🎉**
