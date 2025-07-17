// frontend/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import Login from './pages/Login';           // ← future-proof login
import Mass from './pages/Mass';             // ← placeholder if needed
import Events from './pages/Events';         // ← add as needed
import Donate from './pages/Donate';         // ← add as needed
import Navbar from './components/Navbar';    // ← shared across pages

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
      </Routes>
    </Router>
  );
}

export default App;