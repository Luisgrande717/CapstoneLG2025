// frontend/src/components/QuickAccessCards.jsx
import './QuickAccessCards.css';
import SacramentsIcon from '../assets/sacraments-icon.png';
import VolunteerIcon from '../assets/volunteer-icon.png';
import DailyReadingsIcon from '../assets/dailyreading-icon.png';
import DonateIcon from '../assets/donate-icon.png';

const cards = [
  {
    title: 'Sacraments',
    description: 'Learn about Baptism, Communion, and Confirmation.',
    icon: SacramentsIcon,
    link: '#'
  },
  {
    title: 'Volunteer',
    description: 'Get involved and make a difference.',
    icon: VolunteerIcon,
    link: '#'
  },
  {
    title: 'Daily Readings',
    description: 'Reflect on today’s scripture.',
    icon: DailyReadingsIcon,
    link: '#'
  },
  {
    title: 'Donate',
    description: 'Support our parish’s mission.',
    icon: DonateIcon,
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
