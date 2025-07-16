// frontend/src/pages/Homepage.jsx
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import EventsCarousel from '../components/EventsCarousel';
import QuickAccessCards from '../components/QuickAccessCards';
import Footer from '../components/Footer';

const Homepage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <EventsCarousel />
      <QuickAccessCards />
      <Footer />
    </>
  );
};

export default Homepage;