import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { dashboardApi } from '../services/api';
import type { DashboardData } from '../types';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [textContent, setTextContent] = useState('');
  const [savedData, setSavedData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const data = await dashboardApi.getData();
      setSavedData(data);
      setTextContent(data.textContent || '');
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const data = await dashboardApi.saveData(textContent);
      setSavedData(data);
      setMessage('Data saved successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Failed to save data:', error);
      setMessage('Failed to save data. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link to="/" className="navbar-brand">
            IntelliCall
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link active">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin" className="nav-link">
                  Admin
                </Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-outline-light" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <h1 className="mb-4">
              Welcome, {user?.name}!
            </h1>

            {message && (
              <div
                className={`alert ${
                  message.includes('success') ? 'alert-success' : 'alert-danger'
                }`}
              >
                {message}
              </div>
            )}

            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Dashboard Notes</h5>
                  </div>
                  <div className="card-body">
                    <textarea
                      className="form-control"
                      rows={10}
                      value={textContent}
                      onChange={(e) => setTextContent(e.target.value)}
                      placeholder="Enter your notes here..."
                    ></textarea>
                    <button
                      className="btn btn-primary mt-3"
                      onClick={handleSave}
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                          ></span>
                          Saving...
                        </>
                      ) : (
                        'Save Data'
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Saved Content</h5>
                  </div>
                  <div className="card-body">
                    {savedData?.textContent ? (
                      <>
                        <div className="saved-content-display mb-3">
                          <pre>{savedData.textContent}</pre>
                        </div>
                        {savedData.updatedAt && (
                          <p className="text-muted small">
                            Last updated:{' '}
                            {new Date(savedData.updatedAt).toLocaleString()}
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="text-muted">No saved content yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
