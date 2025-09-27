/**
 * Quick Access Cards Component
 *
 * Displays navigation cards for key parish features
 * Supports bilingual content with automatic translation
 *
 * @returns {JSX.Element} Grid of quick access cards
 */

import './QuickAccessCards.css';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

import SacramentsIcon from '../assets/sacraments-icon.png';
import VolunteerIcon from '../assets/volunteer-icon.png';
import DailyReadingsIcon from '../assets/dailyreading-icon.png';
import DonateIcon from '../assets/donate-icon.png';

const QuickAccessCards = () => {
  const { t } = useLanguage();

  // Define cards with translation keys
  const cards = [
    {
      titleKey: 'sacraments',
      descriptionKey: 'sacramentsDesc',
      icon: SacramentsIcon,
      link: '/sacraments',
      fallbackTitle: 'Sacraments',
      fallbackDesc: 'Learn about Baptism, Communion, and Confirmation.',
    },
    {
      titleKey: 'aboutUs',
      descriptionKey: 'aboutUsDesc',
      icon: VolunteerIcon,
      link: '/about-us',
      fallbackTitle: 'About Us',
      fallbackDesc: 'Learn about our diverse community and faith.',
    },
    {
      titleKey: 'dailyReadingsCard',
      descriptionKey: 'dailyReadingsDesc',
      icon: DailyReadingsIcon,
      link: '/readings',
      fallbackTitle: 'Daily Readings',
      fallbackDesc: "Reflect on today's scripture.",
    },
    {
      titleKey: 'donateCard',
      descriptionKey: 'donateDesc',
      icon: DonateIcon,
      link: '/donate',
      fallbackTitle: 'Donate',
      fallbackDesc: "Support our parish's mission.",
    },
  ];

  return (
    <section className="quick-access">
      <h2>{t('quickAccess', { fallback: 'Quick Access' })}</h2>
      <div className="card-grid">
        {cards.map((card, idx) => (
          <Link key={idx} to={card.link} className="access-card">
            <img src={card.icon} alt={t(card.titleKey, { fallback: card.fallbackTitle })} />
            <h3>{t(card.titleKey, { fallback: card.fallbackTitle })}</h3>
            <p>{t(card.descriptionKey, { fallback: card.fallbackDesc })}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default QuickAccessCards;
