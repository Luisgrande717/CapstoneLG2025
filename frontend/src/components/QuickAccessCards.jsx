// frontend/src/components/QuickAccessCards.jsx
import './QuickAccessCards.css';
import { Link } from 'react-router-dom';

import SacramentsIcon from '../assets/sacraments-icon.png';
import VolunteerIcon from '../assets/volunteer-icon.png';
import DailyReadingsIcon from '../assets/dailyreading-icon.png';
import DonateIcon from '../assets/donate-icon.png';

const cards = [
  {
    title: 'Sacraments',
    description: 'Learn about Baptism, Communion, and Confirmation.',
    icon: SacramentsIcon,
    link: '/sacraments'
  },
  {
    title: 'Volunteer',
    description: 'Get involved and make a difference.',
    icon: VolunteerIcon,
    link: '/volunteer'
  },
  {
    title: 'Daily Readings',
    description: 'Reflect on today’s scripture.',
    icon: DailyReadingsIcon,
    link: '/readings'
  },
  {
    title: 'Donate',
    description: 'Support our parish’s mission.',
    icon: DonateIcon,
    link: '/donate'
  }
];

const QuickAccessCards = () => {
  return (
    <section className="quick-access">
      <h2>Quick Access</h2>
      <div className="card-grid">
        {cards.map((card, idx) => (
          <Link key={idx} to={card.link} className="access-card">
            <img src={card.icon} alt={card.title} />
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default QuickAccessCards;