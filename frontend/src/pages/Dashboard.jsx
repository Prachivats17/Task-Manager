import React, { useState, useEffect } from 'react';
import { tasksAPI, projectsAPI } from '../api/api';
import { useAuth } from '../context/AuthContext';
import '../styles/dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await tasksAPI.getDashboardStats();
      setStats(response.data.data);
    } catch (err) {
      setError('Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="spinner"></div>;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name}!</h1>
        <p>Here's your task overview</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#e3f2fd' }}>📊</div>
            <h3>Total Projects</h3>
            <p className="stat-number">{stats.totalProjects}</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#f3e5f5' }}>📋</div>
            <h3>Total Tasks</h3>
            <p className="stat-number">{stats.totalTasks}</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#e8f5e9' }}>✓</div>
            <h3>Completed Tasks</h3>
            <p className="stat-number">{stats.completedTasks}</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#fff3e0' }}>⏳</div>
            <h3>In Progress</h3>
            <p className="stat-number">{stats.inProgressTasks}</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#ffebee' }}>⚠️</div>
            <h3>Overdue Tasks</h3>
            <p className="stat-number">{stats.overdueTasks}</p>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#eceff1' }}>👤</div>
            <h3>My Tasks</h3>
            <p className="stat-number">{stats.myTasks}</p>
          </div>
        </div>
      )}

      <div className="dashboard-content">
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <a href="/projects" className="btn btn-primary">Create Project</a>
            <a href="/tasks" className="btn btn-success">View All Tasks</a>
          </div>
        </div>
      </div>
    </div>
  );
}
