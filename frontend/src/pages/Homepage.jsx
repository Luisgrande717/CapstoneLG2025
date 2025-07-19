// frontend/src/pages/Homepage.jsx
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import EventsCarousel from '../components/EventsCarousel';
import QuickAccessCards from '../components/QuickAccessCards';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';


const Homepage = () => {
    const { t } = useLanguage();

  return (
    <>
      <HeroSection />
      <EventsCarousel />
      <QuickAccessCards />
    </>
  );
};

export default Homepage;