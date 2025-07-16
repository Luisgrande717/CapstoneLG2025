// frontend/src/components/QuickAccessCards.jsx
import './QuickAccessCards.css';

const cards = [
  {
    title: 'Sacraments',
    description: 'Learn about Baptism, Communion, and Confirmation.',
    icon: '/assets/sacrament-icon.png',
    link: '#'
  },
  {
    title: 'Volunteer',
    description: 'Get involved and make a difference.',
    icon: '/assets/volunteer-icon.png',
    link: '#'
  },
  {
    title: 'Daily Readings',
    description: 'Reflect on today’s scripture.',
    icon: '/assets/readings-icon.png',
    link: '#'
  },
  {
    title: 'Donate',
    description: 'Support our parish’s mission.',
    icon: '/assets/donate-icon.png',
    link: '#'
  }
];

const QuickAccessCards = () => {
  return (
    <section className="quick-access">
      <h2>Quick Access</h2>
      <div className="card-grid">
        {cards.map((card, idx) => (
          <a key={idx} href={card.link} className="access-card">
            <img src={card.icon} alt={card.title} />
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default QuickAccessCards;