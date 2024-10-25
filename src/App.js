import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Leaderboard from './components/Leaderboard';
import SubmitMatch from './components/SubmitMatch';

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
      const response = await axios.get('/');
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
      <div>
        <nav>
          <ul>
            <li><Link to="/leaderboard">Classifica ELO</Link></li>
            <li><Link to="/submit-match">Registra Partita</Link></li>
          </ul>
        </nav>
        {user ? (
          <>
            <p>Benvenuto, {user.displayName}</p>
            <button onClick={signOutUser}>Logout</button>
          </>
        ) : (
          <button onClick={signInWithGoogle}>Login con Google</button>
        )}
        <Routes>
          <Route exact path="/leaderboard" element={<Leaderboard />} />
          <Route path="/submit-match" element={<SubmitMatch user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
