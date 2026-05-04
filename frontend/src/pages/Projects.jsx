import React, { useState, useEffect } from 'react';
import { projectsAPI } from '../api/api';
import { useNavigate } from 'react-router-dom';
import '../styles/projects.css';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectsAPI.getAll();
      setProjects(response.data.data);
    } catch (err) {
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      await projectsAPI.create(formData);
      setFormData({ name: '', description: '' });
      setShowForm(false);
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create project');
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await projectsAPI.delete(id);
      fetchProjects();
    } catch (err) {
      setError('Failed to delete project');
    }
  };

  if (loading) return <div className="spinner"></div>;

  return (
    <div className="projects-page">
      <div className="page-header">
        <h1>Projects</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'New Project'}
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {showForm && (
        <div className="form-card">
          <h2>Create New Project</h2>
          <form onSubmit={handleCreateProject}>
            <div className="form-group">
              <label>Project Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="Enter project name"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter project description"
                rows="4"
              ></textarea>
            </div>

            <button type="submit" className="btn-primary">Create Project</button>
          </form>
        </div>
      )}

      <div className="projects-grid">
        {projects.length === 0 ? (
          <p className="empty-message">No projects yet. Create one to get started!</p>
        ) : (
          projects.map((project) => (
            <div key={project._id} className="project-card">
              <div className="project-header">
                <h3>{project.name}</h3>
                <span className={`status-badge ${project.status}`}>{project.status}</span>
              </div>
              
              <p className="project-description">{project.description}</p>
              
              <div className="project-meta">
                <span className="member-count">👥 {project.members.length} members</span>
              </div>

              <div className="project-actions">
                <button
                  className="btn-primary"
                  onClick={() => navigate(`/projects/${project._id}`)}
                >
                  View
                </button>
                <button
                  className="btn-danger"
                  onClick={() => handleDeleteProject(project._id)}
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
