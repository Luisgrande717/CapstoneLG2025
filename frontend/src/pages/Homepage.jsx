// frontend/src/pages/Homepage.jsx
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import EventsCarousel from '../components/EventsCarousel';
// import QuickAccessCards from '../components/QuickAccessCards'; ← once you build this
// import Footer from '../components/Footer'; ← when ready

const Homepage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <EventsCarousel />
      {/* <QuickAccessCards /> */}
      {/* <Footer /> */}
    </>
  );
};

export default Homepage;