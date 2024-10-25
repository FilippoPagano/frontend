import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Leaderboard from './components/Leaderboard';
import SubmitMatch from './components/SubmitMatch';
import ConfirmMatch from './components/ConfirmMatch';
import 'bootstrap/dist/css/bootstrap.min.css';

// Configurazione Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC-OQFh6eSSaT4eYsmTrGuPl4rlUmXfzFI",
  authDomain: "pingpong-elo.firebaseapp.com",
  projectId: "pingpong-elo",
  storageBucket: "pingpong-elo.appspot.com",
  messagingSenderId: "265334349296",
  appId: "1:265334349296:web:3384b7a6d387aacffa5135",
  measurementId: "G-WV8L2S19P0"
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => setUser(user));
  }, []);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => setUser(result.user))
      .catch((error) => console.log(error));
  };

  const signOutUser = () => {
    signOut(auth).then(() => setUser(null));
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/games/leaderboard');
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error('Endpoint non trovato (404)');
      } else {
        console.error('Errore nella richiesta:', error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">Ping Pong ELO</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Classifica ELO</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/submit-match">Registra Partita</Link>
              </li>
              {user && (
                <li className="nav-item">
                  <Link className="nav-link" to="/confirm-match">Conferma Partite</Link>
                </li>
              )}
            </ul>
          </div>
          <div>
            {user ? (
              <>
                <span className="navbar-text">Ciao, {user.displayName}</span>
                <button onClick={signOutUser} className="btn btn-outline-danger ml-2">Logout</button>
              </>
            ) : (
              <button onClick={signInWithGoogle} className="btn btn-outline-primary">Login con Google</button>
            )}
          </div>
        </nav>

        <Routes>
          <Route exact path="/" element={<Leaderboard />} />
          <Route path="/submit-match" element={<SubmitMatch user={user} />} />
          <Route path="/confirm-match" element={<ConfirmMatch user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
