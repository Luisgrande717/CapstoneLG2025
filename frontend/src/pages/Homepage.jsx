/**
 * Homepage Component
 *
 * Main landing page for Our Lady of Fatima Parish website
 * Displays hero section, events carousel, bulletin preview, and quick access cards
 *
 * @returns {JSX.Element} Homepage component
 */

import HeroSection from '../components/HeroSection';
import EventsCarousel from '../components/EventsCarousel';
import FeaturedAnnouncement from '../components/FeaturedAnnouncement';
import BulletinPreview from '../components/BulletinPreview';
import QuickAccessCards from '../components/QuickAccessCards';

const Homepage = () => {
  return (
    <>
      <HeroSection />
      <FeaturedAnnouncement />
      <BulletinPreview />
      <EventsCarousel />
      <QuickAccessCards />
    </>
  );
};

export default Homepage;
