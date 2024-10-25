import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Leaderboard from './components/Leaderboard';
import SubmitMatch from './components/SubmitMatch';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Classifica ELO</Link></li>
            <li><Link to="/submit-match">Registra Partita</Link></li>
          </ul>
        </nav>
        
        <Routes>
          <Route exact path="/" element={<Leaderboard />} />
          <Route path="/submit-match" element={<SubmitMatch />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
