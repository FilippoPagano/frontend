import React, { useState } from 'react';
import axios from 'axios';

const SubmitMatch = ({ user }) => {
  const [opponent, setOpponent] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/games/match', { player1: user.uid, player2: opponent, winner: result })
      .then(() => {
        alert('Partita inserita in attesa di conferma');
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registra Partita</h2>
      <input
        type="text"
        placeholder="ID avversario"
        value={opponent}
        onChange={(e) => setOpponent(e.target.value)}
      />
      <select onChange={(e) => setResult(e.target.value)}>
        <option value="">Risultato</option>
        <option value={user.uid}>Hai vinto</option>
        <option value={opponent}>Hai perso</option>
      </select>
      <button type="submit">Invia</button>
    </form>
  );
};

export default SubmitMatch;
