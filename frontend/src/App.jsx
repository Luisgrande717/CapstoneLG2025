// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Mass from './pages/Mass';
import Events from './pages/Events';
import Donate from './pages/Donate';
import Sacraments from './pages/Sacraments';
import Volunteer from './pages/Volunteer'; // scaffold this if not built yet
import Readings from './pages/Readings';   // scaffold this if not built yet

import Navbar from './components/Navbar';
import Footer from './components/Footer'; // optional shared component

function App() {
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

export default App;