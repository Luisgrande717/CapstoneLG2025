// frontend/src/pages/Donate.jsx
const Donate = () => {
  return (
    <section style={styles.container}>
      <h2 style={styles.title}>Support Our Mission</h2>
      <p style={styles.description}>Online donations will be available soon. Thank you for helping us grow and serve!</p>
    </section>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    padding: '80px 20px',
    backgroundColor: '#fbf9f5',
    textAlign: 'center'
  },
  title: {
    fontSize: '2.2rem',
    marginBottom: '20px',
    color: '#312e2b'
  },
  description: {
    fontSize: '1.2rem',
    color: '#777'
  }
};

export default Donate;