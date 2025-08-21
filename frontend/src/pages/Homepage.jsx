/**
 * Homepage Component
 *
 * Main landing page for Our Lady of Fatima Parish website
 * Displays hero section, events carousel, and quick access cards
 *
 * @returns {JSX.Element} Homepage component
 */

import HeroSection from '../components/HeroSection';
import EventsCarousel from '../components/EventsCarousel';
import QuickAccessCards from '../components/QuickAccessCards';

const Homepage = () => {
  return (
    <>
      <HeroSection />
      <EventsCarousel />
      <QuickAccessCards />
    </>
  );
};

export default Homepage;
