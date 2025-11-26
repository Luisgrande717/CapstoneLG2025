import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config/api';
import './AnnouncementManager.css';

const AnnouncementManager = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [formData, setFormData] = useState({ titleEn: '', titleEs: '', descriptionEn: '', descriptionEs: '', priority: 0 });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { token } = useAuth();

  useEffect(() => { fetchAnnouncements(); }, []);

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/announcements`,
        { headers: { Authorization: `Bearer ${token}` } });
      if (res.data.success) setAnnouncements(res.data.data);
    } catch (err) { console.error(err); }
  };

  const handleToggle = async (id) => {
    try {
      console.log('Toggling announcement:', id);
      console.log('Token:', token);
      const res = await axios.patch(`${API_URL}/api/announcements/${id}/toggle`, {},
        { headers: { Authorization: `Bearer ${token}` } });
      console.log('Toggle response:', res.data);
      fetchAnnouncements();
    } catch (err) {
      console.error('Toggle error:', err);
      console.error('Error response:', err.response?.data);
      alert('Error toggling announcement: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this announcement?')) return;
    try {
      console.log('Deleting announcement:', id);
      console.log('Token:', token);
      const res = await axios.delete(`${API_URL}/api/announcements/${id}`,
        { headers: { Authorization: `Bearer ${token}` } });
      console.log('Delete response:', res.data);
      fetchAnnouncements();
    } catch (err) {
      console.error('Delete error:', err);
      console.error('Error response:', err.response?.data);
      alert('Error deleting: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }
    if (!formData.titleEn || !formData.titleEs) {
      alert('Please provide both English and Spanish titles');
      return;
    }

    setIsUploading(true);
    const data = new FormData();
    data.append('file', selectedFile);
    data.append('titleEn', formData.titleEn);
    data.append('titleEs', formData.titleEs);
    data.append('descriptionEn', formData.descriptionEn);
    data.append('descriptionEs', formData.descriptionEs);
    data.append('priority', formData.priority);

    try {
      await axios.post(`${API_URL}/api/announcements`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Announcement created successfully!');
      setFormData({ titleEn: '', titleEs: '', descriptionEn: '', descriptionEs: '', priority: 0 });
      setSelectedFile(null);
      document.querySelector('input[type="file"]').value = '';
      fetchAnnouncements();
    } catch (err) {
      alert('Error creating announcement: ' + (err.response?.data?.error || err.message));
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="announcement-manager">
      <h2>Manage Announcements</h2>

      <form onSubmit={handleSubmit} className="announcement-form">
        <h3>Create New Announcement</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Title (English) *</label>
            <input type="text" name="titleEn" value={formData.titleEn} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Title (Spanish) *</label>
            <input type="text" name="titleEs" value={formData.titleEs} onChange={handleInputChange} required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Description (English)</label>
            <textarea name="descriptionEn" value={formData.descriptionEn} onChange={handleInputChange} rows="3"></textarea>
          </div>
          <div className="form-group">
            <label>Description (Spanish)</label>
            <textarea name="descriptionEs" value={formData.descriptionEs} onChange={handleInputChange} rows="3"></textarea>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Priority (0-100)</label>
            <input type="number" name="priority" value={formData.priority} onChange={handleInputChange} min="0" max="100" />
          </div>
          <div className="form-group">
            <label>File (Image or PDF) *</label>
            <input type="file" onChange={handleFileChange} accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx" required />
            {selectedFile && <p className="file-info">Selected: {selectedFile.name}</p>}
          </div>
        </div>
        <button type="submit" className="btn-submit" disabled={isUploading}>
          {isUploading ? 'Uploading...' : 'Create Announcement'}
        </button>
      </form>

      <div className="announcements-list">
        <h3>Current Announcements</h3>
        {announcements.length === 0 ? (
          <p>No announcements yet.</p>
        ) : (
          announcements.map(a => (
            <div key={a._id} className={`announcement-item ${a.isActive ? 'active' : ''}`}>
              <div className="announcement-info">
                <h4>{a.title.en} / {a.title.es}</h4>
                <p>{a.description.en}</p>
                <span className="priority">Priority: {a.priority}</span>
                <span className="file-type">File: {a.fileType}</span>
              </div>
              <div className="announcement-actions">
                <button onClick={() => handleToggle(a._id)}
                  className={a.isActive ? 'btn-deactivate' : 'btn-activate'}>
                  {a.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <button onClick={() => handleDelete(a._id)} className="btn-delete">Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AnnouncementManager;
