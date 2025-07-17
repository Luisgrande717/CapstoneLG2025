// frontend/src/pages/Events.jsx
const Events = () => {
  return (
    <section style={styles.container}>
      <h2 style={styles.title}>Upcoming Events</h2>
      <p style={styles.description}>Check back soon for parish gatherings, retreats, and community celebrations!</p>
    </section>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    padding: '80px 20px',
    backgroundColor: '#f4f2ec',
    textAlign: 'center'
  },
  title: {
    fontSize: '2.2rem',
    marginBottom: '20px',
    color: '#312e2b'
  },
  description: {
    fontSize: '1.2rem',
    color: '#666'
  }
};

export default Events;