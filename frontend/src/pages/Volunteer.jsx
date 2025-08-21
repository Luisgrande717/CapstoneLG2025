// frontend/src/pages/Volunteer.jsx
import './Volunteer.css';

const Volunteer = () => {
  return (
    <section className="volunteer-page">
      <div className="volunteer-card">
        <h2>Volunteer With Us</h2>
        <p>
          Help bring our parish mission to life by sharing your time and talent. Whether you're
          greeting guests, helping at events, or leading ministry efforts—there’s a place for you
          here.
        </p>

        <div className="volunteer-section">
          <h3>Ministry Support</h3>
          <p>
            Join liturgical teams, music ministry, or prayer groups that enrich our worship
            experience.
          </p>
        </div>

        <div className="volunteer-section">
          <h3>Event Help</h3>
          <p>
            Assist with seasonal gatherings, fundraisers, and fellowship activities throughout the
            year.
          </p>
        </div>

        <div className="volunteer-section">
          <h3>Outreach Programs</h3>
          <p>Help serve the community through food drives, youth mentoring, and elder visits.</p>
        </div>
      </div>
    </section>
  );
};

export default Volunteer;
