/**
 * Subscriber Manager Component
 *
 * Admin component for managing email subscribers and sending mass emails
 */

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import './SubscriberManager.css';

const SubscriberManager = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [selectedSubscribers, setSelectedSubscribers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [emailForm, setEmailForm] = useState({
    subject: '',
    message: '',
    language: '',
    attachment: null
  });
  const [isSending, setIsSending] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [filter, setFilter] = useState({ language: '', source: '' });
  const { token } = useAuth();

  useEffect(() => {
    fetchSubscribers();
  }, [filter]);

  const fetchSubscribers = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (filter.language) params.append('language', filter.language);
      if (filter.source) params.append('source', filter.source);

      const res = await axios.get(`http://localhost:8080/api/subscriptions/list?${params}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.data.success) {
        setSubscribers(res.data.data.subscriptions);
      }
    } catch (err) {
      console.error('Error fetching subscribers:', err);
      alert('Failed to load subscribers');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedSubscribers(subscribers.map(sub => sub.email));
    } else {
      setSelectedSubscribers([]);
    }
  };

  const handleSelectSubscriber = (email) => {
    if (selectedSubscribers.includes(email)) {
      setSelectedSubscribers(selectedSubscribers.filter(e => e !== email));
    } else {
      setSelectedSubscribers([...selectedSubscribers, email]);
    }
  };

  const handleFileChange = (e) => {
    setEmailForm({ ...emailForm, attachment: e.target.files[0] });
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();

    if (!emailForm.subject || !emailForm.message) {
      alert('Please provide both subject and message');
      return;
    }

    if (selectedSubscribers.length === 0 && !emailForm.language) {
      const confirm = window.confirm(
        'No subscribers selected and no language filter applied. This will send to ALL subscribers. Continue?'
      );
      if (!confirm) return;
    }

    setIsSending(true);

    try {
      const formData = new FormData();
      formData.append('subject', emailForm.subject);
      formData.append('message', emailForm.message);
      if (emailForm.language) formData.append('language', emailForm.language);
      if (selectedSubscribers.length > 0) {
        formData.append('selectedEmails', JSON.stringify(selectedSubscribers));
      }
      if (emailForm.attachment) {
        formData.append('attachment', emailForm.attachment);
      }

      const res = await axios.post(
        'http://localhost:8080/api/subscriptions/send-mass-email',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (res.data.success) {
        alert(res.data.message);
        setEmailForm({ subject: '', message: '', language: '', attachment: null });
        setSelectedSubscribers([]);
        setShowEmailForm(false);
        document.querySelector('input[type="file"]')?.value = '';
      }
    } catch (err) {
      console.error('Error sending email:', err);
      alert(err.response?.data?.error || 'Failed to send email');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="subscriber-manager">
      <div className="manager-header">
        <h2>Email Subscribers</h2>
        <button
          onClick={() => setShowEmailForm(!showEmailForm)}
          className="btn-compose"
        >
          {showEmailForm ? 'Hide Email Form' : 'Compose Mass Email'}
        </button>
      </div>

      {showEmailForm && (
        <div className="email-form-section">
          <h3>Compose Email</h3>
          <form onSubmit={handleSendEmail} className="email-form">
            <div className="form-group">
              <label>Subject *</label>
              <input
                type="text"
                value={emailForm.subject}
                onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                placeholder="Email subject"
                required
              />
            </div>

            <div className="form-group">
              <label>Message *</label>
              <textarea
                value={emailForm.message}
                onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })}
                placeholder="Email message..."
                rows="8"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Language Filter (optional)</label>
                <select
                  value={emailForm.language}
                  onChange={(e) => setEmailForm({ ...emailForm, language: e.target.value })}
                >
                  <option value="">All Languages</option>
                  <option value="en">English Only</option>
                  <option value="es">Spanish Only</option>
                </select>
              </div>

              <div className="form-group">
                <label>Attachment (optional)</label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx"
                />
                {emailForm.attachment && (
                  <p className="file-name">Selected: {emailForm.attachment.name}</p>
                )}
              </div>
            </div>

            <div className="recipients-info">
              <p>
                <strong>Recipients: </strong>
                {selectedSubscribers.length > 0
                  ? `${selectedSubscribers.length} selected subscriber(s)`
                  : emailForm.language
                    ? `All ${emailForm.language === 'en' ? 'English' : 'Spanish'} subscribers`
                    : 'All subscribers'
                }
              </p>
            </div>

            <button type="submit" className="btn-send" disabled={isSending}>
              {isSending ? 'Sending...' : 'Send Email'}
            </button>
          </form>
        </div>
      )}

      <div className="filters-section">
        <h3>Filters</h3>
        <div className="filters">
          <select
            value={filter.language}
            onChange={(e) => setFilter({ ...filter, language: e.target.value })}
          >
            <option value="">All Languages</option>
            <option value="en">English</option>
            <option value="es">Spanish</option>
          </select>

          <select
            value={filter.source}
            onChange={(e) => setFilter({ ...filter, source: e.target.value })}
          >
            <option value="">All Sources</option>
            <option value="footer">Footer</option>
            <option value="direct">Direct</option>
          </select>
        </div>
      </div>

      <div className="subscribers-section">
        <div className="section-header">
          <h3>Subscriber List ({subscribers.length})</h3>
          <label className="select-all">
            <input
              type="checkbox"
              checked={selectedSubscribers.length === subscribers.length && subscribers.length > 0}
              onChange={handleSelectAll}
            />
            Select All
          </label>
        </div>

        {isLoading ? (
          <p className="loading">Loading subscribers...</p>
        ) : subscribers.length === 0 ? (
          <p className="no-subscribers">No subscribers found.</p>
        ) : (
          <div className="subscribers-table">
            <table>
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Email</th>
                  <th>Language</th>
                  <th>Source</th>
                  <th>Subscribed On</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((sub) => (
                  <tr key={sub._id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedSubscribers.includes(sub.email)}
                        onChange={() => handleSelectSubscriber(sub.email)}
                      />
                    </td>
                    <td>{sub.email}</td>
                    <td>
                      <span className={`badge ${sub.preferredLanguage}`}>
                        {sub.preferredLanguage === 'en' ? 'English' : 'Spanish'}
                      </span>
                    </td>
                    <td>
                      <span className="badge-source">{sub.source}</span>
                    </td>
                    <td>{new Date(sub.createdAt).toLocaleDateString()}</td>
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

export default SubscriberManager;
