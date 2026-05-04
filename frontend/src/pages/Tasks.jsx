import React, { useState, useEffect } from 'react';
import { tasksAPI, projectsAPI } from '../api/api';
import '../styles/tasks.css';

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({ status: '', projectId: '' });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectId: '',
    priority: 'medium',
    dueDate: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchTasks();
    }
  }, [filters]);

  const fetchData = async () => {
    try {
      const [tasksRes, projectsRes] = await Promise.all([
        tasksAPI.getAll(),
        projectsAPI.getAll(),
      ]);
      setTasks(tasksRes.data.data);
      setProjects(projectsRes.data.data);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await tasksAPI.getAll(filters);
      setTasks(response.data.data);
    } catch (err) {
      setError('Failed to load tasks');
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await tasksAPI.create(formData);
      setFormData({
        title: '',
        description: '',
        projectId: '',
        priority: 'medium',
        dueDate: '',
      });
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
    }
  };

  const handleUpdateTask = async (id, updates) => {
    try {
      await tasksAPI.update(id, updates);
      fetchTasks();
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await tasksAPI.delete(id);
      fetchTasks();
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#28a745';
      case 'in-progress':
        return '#ffc107';
      default:
        return '#6c757d';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#dc3545';
      case 'medium':
        return '#ffc107';
      case 'low':
        return '#28a745';
      default:
        return '#6c757d';
    }
  };

  const isOverdue = (dueDate, status) => {
    if (!dueDate || status === 'completed') return false;
    return new Date(dueDate) < new Date();
  };

  if (loading) return <div className="spinner"></div>;

  return (
    <div className="tasks-page">
      <div className="page-header">
        <h1>Tasks</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'New Task'}
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {showForm && (
        <div className="form-card">
          <h2>Create New Task</h2>
          <form onSubmit={handleCreateTask}>
            <div className="form-row">
              <div className="form-group">
                <label>Task Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  placeholder="Enter task title"
                />
              </div>

              <div className="form-group">
                <label>Project</label>
                <select
                  value={formData.projectId}
                  onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                  required
                >
                  <option value="">Select a project</option>
                  {projects.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter task description"
                rows="3"
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="form-group">
                <label>Due Date</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
              </div>
            </div>

            <button type="submit" className="btn-primary">Create Task</button>
          </form>
        </div>
      )}

      <div className="filters">
        <div className="filter-group">
          <label>Status</label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">All Statuses</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Project</label>
          <select
            value={filters.projectId}
            onChange={(e) => setFilters({ ...filters, projectId: e.target.value })}
          >
            <option value="">All Projects</option>
            {projects.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="tasks-list">
        {tasks.length === 0 ? (
          <p className="empty-message">No tasks found. Create one to get started!</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              className={`task-item ${isOverdue(task.dueDate, task.status) ? 'overdue' : ''}`}
            >
              <div className="task-content">
                <div className="task-title-section">
                  <h3>{task.title}</h3>
                  {isOverdue(task.dueDate, task.status) && (
                    <span className="overdue-badge">⚠️ Overdue</span>
                  )}
                </div>
                
                <p className="task-description">{task.description}</p>

                <div className="task-meta">
                  <span
                    className="badge"
                    style={{ backgroundColor: getStatusColor(task.status) }}
                  >
                    {task.status.replace('-', ' ')}
                  </span>
                  <span
                    className="badge"
                    style={{ backgroundColor: getPriorityColor(task.priority) }}
                  >
                    {task.priority} priority
                  </span>
                  {task.dueDate && (
                    <span className="due-date">📅 {new Date(task.dueDate).toLocaleDateString()}</span>
                  )}
                  {task.project && (
                    <span className="project-tag">{task.project.name}</span>
                  )}
                </div>
              </div>

              <div className="task-actions">
                <select
                  value={task.status}
                  onChange={(e) => handleUpdateTask(task._id, { status: e.target.value })}
                  className="status-select"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>

                <button
                  className="btn-danger"
                  onClick={() => handleDeleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
