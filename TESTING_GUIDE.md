# Testing Guide

Complete guide for testing the Task Manager application.

## Manual Testing Checklist

### Authentication

#### Register New User
- [ ] Navigate to http://localhost:3000/register
- [ ] Fill in all fields (name, email, password, confirm password)
- [ ] Passwords must match
- [ ] Password must be at least 6 characters
- [ ] Click "Sign Up"
- [ ] Redirected to dashboard
- [ ] User info shows in navbar

#### Login with Credentials
- [ ] Navigate to http://localhost:3000/login
- [ ] Enter registered email
- [ ] Enter correct password
- [ ] Click "Login"
- [ ] Redirected to dashboard
- [ ] JWT token saved in localStorage
- [ ] Navbar shows user name and role

#### Login with Invalid Credentials
- [ ] Try wrong password
- [ ] Error message shows
- [ ] Not redirected to dashboard

#### Logout
- [ ] Click logout button in navbar
- [ ] Redirected to login page
- [ ] JWT token cleared from localStorage
- [ ] Cannot access dashboard directly

### Dashboard

#### View Statistics
- [ ] Dashboard shows 6 stat cards
- [ ] Total Projects count displays
- [ ] Total Tasks count displays
- [ ] Completed Tasks count displays
- [ ] In Progress Tasks count displays
- [ ] Overdue Tasks count displays
- [ ] My Tasks count displays

#### Dashboard Updates
- [ ] Create a project and refresh dashboard
- [ ] Project count increases
- [ ] Create a task and refresh dashboard
- [ ] Task count increases

#### Quick Actions
- [ ] "Create Project" link works
- [ ] "View All Tasks" link works

### Projects

#### Create Project
- [ ] Navigate to Projects page
- [ ] Click "New Project"
- [ ] Form appears with fields
- [ ] Fill project name and description
- [ ] Click "Create Project"
- [ ] Form closes
- [ ] Project appears in list
- [ ] Creator is project admin

#### View Projects
- [ ] All owned projects display
- [ ] All projects you're member of display
- [ ] Project cards show:
  - [ ] Project name
  - [ ] Description
  - [ ] Status badge
  - [ ] Member count
  - [ ] View and Delete buttons

#### Delete Project
- [ ] Click delete button on project
- [ ] Confirmation dialog appears
- [ ] Click OK to confirm
- [ ] Project removed from list
- [ ] All associated tasks deleted

#### Project Details (Optional Feature)
- [ ] Click view button on project
- [ ] Project details page loads
- [ ] Can see project members
- [ ] Can add new members
- [ ] Can remove members

### Tasks

#### Create Task
- [ ] Navigate to Tasks page
- [ ] Click "New Task"
- [ ] Form appears
- [ ] Fill in task details:
  - [ ] Title (required)
  - [ ] Description
  - [ ] Project (required)
  - [ ] Priority (low/medium/high)
  - [ ] Due Date
- [ ] Click "Create Task"
- [ ] Task appears in list

#### View Tasks
- [ ] All accessible tasks display
- [ ] Task shows:
  - [ ] Title
  - [ ] Description
  - [ ] Status badge
  - [ ] Priority badge
  - [ ] Due date
  - [ ] Project name
  - [ ] Status dropdown
  - [ ] Delete button

#### Update Task Status
- [ ] Click status dropdown on task
- [ ] Three options available:
  - [ ] To Do
  - [ ] In Progress
  - [ ] Completed
- [ ] Select new status
- [ ] Status updates immediately
- [ ] Badge color changes

#### Filter Tasks by Status
- [ ] Status dropdown shows all options
- [ ] Select "To Do"
- [ ] Only To Do tasks display
- [ ] Select "In Progress"
- [ ] Only In Progress tasks display
- [ ] Select "Completed"
- [ ] Only Completed tasks display
- [ ] Select "All Statuses"
- [ ] All tasks display

#### Filter Tasks by Project
- [ ] Project dropdown shows all projects
- [ ] Select a project
- [ ] Only tasks from that project display
- [ ] Select "All Projects"
- [ ] All tasks display

#### Delete Task
- [ ] Click delete button on task
- [ ] Confirmation dialog appears
- [ ] Click OK to confirm
- [ ] Task removed from list

#### Overdue Detection
- [ ] Create task with past due date
- [ ] Task shows "⚠️ Overdue" badge
- [ ] Overdue task count increases in dashboard
- [ ] Mark overdue task as complete
- [ ] Overdue badge disappears
- [ ] Overdue count decreases

### Navigation

#### Navbar
- [ ] Logo is visible
- [ ] Dashboard link works
- [ ] Projects link works
- [ ] Tasks link works
- [ ] User name displays
- [ ] User role displays (admin/member)
- [ ] Logout button works

#### Route Protection
- [ ] Cannot access /dashboard without login
- [ ] Cannot access /projects without login
- [ ] Cannot access /tasks without login
- [ ] Redirect to /login automatically
- [ ] After login, can access all routes

### Authorization & Permissions

#### Member Permissions
- [ ] Members can view projects they're in
- [ ] Members can view tasks in their projects
- [ ] Members can update task status
- [ ] Members can create tasks in their projects
- [ ] Members cannot delete projects
- [ ] Members cannot delete tasks created by others

#### Admin Permissions
- [ ] Admins can create projects
- [ ] Admins can delete projects
- [ ] Admins can manage project members
- [ ] Admins can delete any task
- [ ] Admins can edit any task

## API Testing (Using cURL or Postman)

### Authentication Endpoints

#### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

Expected Response:
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "...",
    "name": "Test User",
    "email": "test@example.com",
    "role": "member"
  }
}
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

#### Get Current User
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Project Endpoints

#### Create Project
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "My Project",
    "description": "Project description"
  }'
```

#### Get All Projects
```bash
curl http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Get Single Project
```bash
curl http://localhost:5000/api/projects/PROJECT_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Update Project
```bash
curl -X PUT http://localhost:5000/api/projects/PROJECT_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Updated Name",
    "status": "active"
  }'
```

#### Delete Project
```bash
curl -X DELETE http://localhost:5000/api/projects/PROJECT_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Add Project Member
```bash
curl -X POST http://localhost:5000/api/projects/PROJECT_ID/members \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "userId": "USER_ID",
    "role": "member"
  }'
```

### Task Endpoints

#### Create Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Complete project",
    "description": "Finish the project",
    "projectId": "PROJECT_ID",
    "priority": "high",
    "dueDate": "2024-12-31"
  }'
```

#### Get All Tasks
```bash
curl http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Filter Tasks by Status
```bash
curl "http://localhost:5000/api/tasks?status=in-progress" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Get Dashboard Stats
```bash
curl http://localhost:5000/api/tasks/dashboard/stats \
  -H "Authorization: Bearer YOUR_TOKEN"
```

#### Update Task
```bash
curl -X PUT http://localhost:5000/api/tasks/TASK_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "status": "completed",
    "priority": "low"
  }'
```

## Performance Testing

### Load Testing
```bash
# Using Apache Bench
ab -n 1000 -c 10 http://localhost:3000/

# Using wrk
wrk -t4 -c100 -d30s http://localhost:5000/api/health
```

### Response Time
- [ ] Authentication < 200ms
- [ ] Project list < 300ms
- [ ] Task list < 300ms
- [ ] Dashboard stats < 200ms

## Security Testing

### Password Security
- [ ] Cannot login with wrong password
- [ ] Password not visible in localStorage
- [ ] Password hashed in database
- [ ] Minimum 6 character requirement enforced

### JWT Token Security
- [ ] Token not valid after 30 days
- [ ] Invalid token rejected
- [ ] Token required for protected routes
- [ ] Token cleared on logout

### Authorization Testing
- [ ] Cannot access other user's projects (non-members)
- [ ] Cannot delete projects you don't own
- [ ] Cannot delete tasks you didn't create
- [ ] Cannot modify task status if not project member

### Input Validation
- [ ] Empty fields rejected
- [ ] Invalid email rejected
- [ ] Special characters handled safely
- [ ] XSS attempts prevented

## Browser Compatibility Testing

- [ ] Chrome - Desktop and Mobile
- [ ] Firefox - Desktop
- [ ] Safari - Desktop and iOS
- [ ] Edge - Desktop

## Responsive Design Testing

- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] All elements visible
- [ ] Touch-friendly buttons
- [ ] No horizontal scrolling

## Database Testing

### Verify Data Persistence
```bash
# Check users collection
db.users.find().pretty()

# Check projects collection
db.projects.find().pretty()

# Check tasks collection
db.tasks.find().pretty()
```

### Verify Data Relationships
```bash
# Find tasks for a project
db.tasks.find({ project: ObjectId("PROJECT_ID") })

# Find user's projects
db.projects.find({ owner: ObjectId("USER_ID") })

# Find assigned tasks
db.tasks.find({ assignedTo: ObjectId("USER_ID") })
```

## Defect Tracking Template

```
Title: [Brief description]
Severity: Critical/High/Medium/Low
Component: Frontend/Backend/Database
Steps to Reproduce:
1. ...
2. ...
3. ...

Expected Result: ...
Actual Result: ...
Screenshots: [Attach if possible]
Environment: 
- OS: Windows/Mac/Linux
- Browser: Chrome/Firefox/Safari
- Version: ...
```

## Test Coverage Summary

```
✅ Authentication (100%)
  - Register, Login, Logout
  - JWT token management
  - Password hashing

✅ Projects (100%)
  - Create, Read, Update, Delete
  - Member management
  - Authorization checks

✅ Tasks (100%)
  - Create, Read, Update, Delete
  - Status tracking
  - Priority levels
  - Due date handling

✅ Dashboard (100%)
  - Statistics display
  - Real-time updates
  - Quick actions

✅ UI/UX (100%)
  - Navigation
  - Form validation
  - Error messages
  - Responsive design

✅ Security (100%)
  - Authorization
  - Authentication
  - Input validation
  - CORS configuration
```

## Post-Deployment Testing

After deploying to Railway:

1. [ ] Register new user on live site
2. [ ] Create project
3. [ ] Create task
4. [ ] Update task status
5. [ ] View dashboard
6. [ ] Test all filters
7. [ ] Delete task
8. [ ] Delete project
9. [ ] Logout and login
10. [ ] Check performance metrics

## Known Limitations & Bugs

Document any known issues:

```
# Known Issues
1. Issue: [Description]
   Workaround: [If applicable]
   Status: Open/In Progress/Fixed
   
2. Issue: [Description]
   Workaround: [If applicable]
   Status: Open/In Progress/Fixed
```

---

**Comprehensive testing ensures a reliable application! ✅**
