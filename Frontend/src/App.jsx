// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import HospitalDetailsPage from './pages/HospitalDetailsPage';
import './App.css';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hospital/:id" element={<HospitalDetailsPage />} />
    </Routes>
  </Router>
);

export default App;
