/**
 * Bulletin Manager Component
 *
 * Admin interface for uploading and managing weekly parish bulletins
 * Allows uploading PDF files, setting week dates, and managing bulletin status
 */

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './BulletinManager.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const BulletinManager = () => {
  const [bulletins, setBulletins] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    weekOf: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    fetchBulletins();
  }, []);

  const fetchBulletins = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${API_URL}/api/bulletins`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        setBulletins(res.data.bulletins);
      }
    } catch (err) {
      console.error('Error fetching bulletins:', err);
      alert('Error loading bulletins: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== 'application/pdf') {
      alert('Please select a PDF file');
      e.target.value = '';
      return;
    }
    setSelectedFile(file);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('Please select a PDF file');
      return;
    }

    if (!formData.title || !formData.weekOf) {
      alert('Please provide title and week date');
      return;
    }

    setIsUploading(true);
    const data = new FormData();
    data.append('bulletin', selectedFile);
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('weekOf', formData.weekOf);

    try {
      const res = await axios.post(`${API_URL}/api/bulletins/upload`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.data.success) {
        alert('Bulletin uploaded successfully!');
        setFormData({ title: '', description: '', weekOf: '' });
        setSelectedFile(null);
        document.querySelector('input[type="file"]').value = '';
        fetchBulletins();
      }
    } catch (err) {
      console.error('Error uploading bulletin:', err);
      alert('Error uploading bulletin: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsUploading(false);
    }
  };

  const handleToggleActive = async (id, currentStatus) => {
    try {
      const res = await axios.patch(
        `${API_URL}/api/bulletins/${id}/activate`,
        { isActive: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        fetchBulletins();
      }
    } catch (err) {
      console.error('Error toggling bulletin:', err);
      alert('Error updating bulletin: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this bulletin? This action cannot be undone.')) {
      return;
    }

    try {
      const res = await axios.delete(`${API_URL}/api/bulletins/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        alert('Bulletin deleted successfully!');
        fetchBulletins();
      }
    } catch (err) {
      console.error('Error deleting bulletin:', err);
      alert('Error deleting bulletin: ' + (err.response?.data?.message || err.message));
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bulletin-manager">
      <div className="manager-header">
        <h2>📄 Bulletin Management</h2>
        <p>Upload and manage weekly parish bulletins</p>
      </div>

      {/* Upload Form */}
      <div className="bulletin-upload-section">
        <h3>Upload New Bulletin</h3>
        <form onSubmit={handleSubmit} className="bulletin-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">
                Bulletin Title <span className="required">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Fifth Sunday of Lent"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="weekOf">
                Week Date <span className="required">*</span>
              </label>
              <input
                type="date"
                id="weekOf"
                name="weekOf"
                value={formData.weekOf}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description (Optional)</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Brief description of bulletin content..."
              rows="3"
            />
          </div>

          <div className="form-group">
            <label htmlFor="bulletin-file">
              PDF File <span className="required">*</span>
            </label>
            <input
              type="file"
              id="bulletin-file"
              accept=".pdf"
              onChange={handleFileChange}
              required
            />
            {selectedFile && (
              <div className="file-info">
                Selected: {selectedFile.name} ({formatFileSize(selectedFile.size)})
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn-upload"
            disabled={isUploading}
          >
            {isUploading ? '⏳ Uploading...' : '📤 Upload Bulletin'}
          </button>
        </form>
      </div>

      {/* Bulletins List */}
      <div className="bulletins-list-section">
        <h3>Existing Bulletins</h3>

        {isLoading ? (
          <div className="loading-state">Loading bulletins...</div>
        ) : bulletins.length === 0 ? (
          <div className="empty-state">
            <p>No bulletins uploaded yet</p>
            <p className="empty-hint">Upload your first bulletin using the form above</p>
          </div>
        ) : (
          <div className="bulletins-table">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Week Of</th>
                  <th>File Size</th>
                  <th>Views</th>
                  <th>Status</th>
                  <th>Uploaded</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bulletins.map((bulletin) => (
                  <tr key={bulletin._id} className={bulletin.isActive ? 'active-bulletin' : ''}>
                    <td>
                      <div className="bulletin-title">
                        {bulletin.title}
                        {bulletin.isActive && <span className="active-badge">CURRENT</span>}
                      </div>
                      {bulletin.description && (
                        <div className="bulletin-description">{bulletin.description}</div>
                      )}
                    </td>
                    <td>{formatDate(bulletin.weekOf)}</td>
                    <td>{formatFileSize(bulletin.fileSize)}</td>
                    <td>{bulletin.viewCount}</td>
                    <td>
                      <span className={`status-badge ${bulletin.isActive ? 'active' : 'inactive'}`}>
                        {bulletin.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>{formatDate(bulletin.uploadedAt)}</td>
                    <td>
                      <div className="action-buttons">
                        <a
                          href={`${API_URL}/api/bulletins/file/${bulletin.filename}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-action btn-view"
                          title="View PDF"
                        >
                          👁️
                        </a>
                        <button
                          onClick={() => handleToggleActive(bulletin._id, bulletin.isActive)}
                          className={`btn-action ${bulletin.isActive ? 'btn-deactivate' : 'btn-activate'}`}
                          title={bulletin.isActive ? 'Deactivate' : 'Activate'}
                        >
                          {bulletin.isActive ? '🔽' : '🔼'}
                        </button>
                        <button
                          onClick={() => handleDelete(bulletin._id)}
                          className="btn-action btn-delete"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BulletinManager;
