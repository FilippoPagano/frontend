import React, { useState } from 'react';
import axios from 'axios';

const SubmitMatch = () => {
  const [winner, setWinner] = useState('');
  const [loser, setLoser] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/games/match', { winnerName: winner, loserName: loser })
      .then(() => {
        alert('Punteggio aggiornato!');
      })
      .catch(err => {
        console.error(err);
        alert('Errore nel registrare la partita');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registra Partita</h2>
      <input
        type="text"
        placeholder="Vincitore"
        value={winner}
        onChange={(e) => setWinner(e.target.value)}
      />
      <input
        type="text"
        placeholder="Perdente"
        value={loser}
        onChange={(e) => setLoser(e.target.value)}
      />
      <button type="submit">Invia</button>
    </form>
  );
};

export default SubmitMatch;
