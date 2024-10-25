import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubmitMatch = ({ user }) => {
  const [opponent, setOpponent] = useState('');
  const [result, setResult] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5001/api/users')
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        setError('Errore nel recupero degli utenti. Riprova più tardi.');
        console.error(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert('Devi essere autenticato per registrare una partita');
      return;
    }
    axios.post('/api/games/match', { player1: user.uid, player2: opponent, winner: result })
      .then(() => {
        alert('Partita inserita in attesa di conferma');
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <h2>Registra Partita</h2>
      {error && <p>{error}</p>}
      <div className="form-group">
        <label>Seleziona Avversario</label>
        <select
          className="form-control"
          value={opponent}
          onChange={(e) => setOpponent(e.target.value)}
        >
          <option value="">Seleziona un avversario</option>
          {users.map((user) => (
            <option key={user.uid} value={user.uid}>{user.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Risultato</label>
        <select className="form-control" value={result} onChange={(e) => setResult(e.target.value)}>
          <option value="">Seleziona il risultato</option>
          <option value={user ? user.uid : ''}>Hai vinto</option>
          <option value={opponent}>Hai perso</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Invia</button>
    </form>
  );
};

export default SubmitMatch;
