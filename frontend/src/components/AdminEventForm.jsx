import { useState } from 'react';
import './AdminEventForm.css';

const AdminEventForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    category: 'Community',
    image: '',
    rsvpLink: '',
    language: 'English',
    location: 'Our Lady of Fatima Parish',
    published: true,
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log('[Admin] Event Created:', data);
      alert('Event added successfully!');
    } catch (err) {
      console.error('[Admin] Error creating event:', err.message);
      alert('Failed to create event.');
    }
  };

  return (
    <form className="admin-event-form" onSubmit={handleSubmit}>
      <h2>Create New Parish Event</h2>

      <input
        type="text"
        name="title"
        placeholder="Event Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Event Description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <input type="date" name="date" value={formData.date} onChange={handleChange} required />

      <select name="category" value={formData.category} onChange={handleChange}>
        <option>Community</option>
        <option>Youth</option>
        <option>Liturgy</option>
        <option>Service</option>
        <option>Feast Day</option>
      </select>

      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={formData.image}
        onChange={handleChange}
      />
      <input
        type="text"
        name="rsvpLink"
        placeholder="RSVP Link"
        value={formData.rsvpLink}
        onChange={handleChange}
      />

      <select name="language" value={formData.language} onChange={handleChange}>
        <option>English</option>
        <option>Spanish</option>
      </select>

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
      />
      <label>
        <input
          type="checkbox"
          name="published"
          checked={formData.published}
          onChange={handleChange}
        />
        Published
      </label>

      <button type="submit">Save Event</button>
    </form>
  );
};

export default AdminEventForm;
