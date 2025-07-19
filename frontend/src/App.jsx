// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import { LanguageProvider } from './context/LanguageContext';

import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Mass from './pages/Mass';
import Events from './pages/Events';
import Donate from './pages/Donate';
import Sacraments from './pages/Sacraments';
import Volunteer from './pages/Volunteer';
import Readings from './pages/Readings';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

function AppRoutes() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mass" element={<Mass />} />
        <Route path="/events" element={<Events />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/sacraments" element={<Sacraments />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/readings" element={<Readings />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppRoutes />
    </LanguageProvider>
  );
}