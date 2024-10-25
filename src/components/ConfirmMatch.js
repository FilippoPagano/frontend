import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ConfirmMatch = ({ user }) => {
  const [pendingMatches, setPendingMatches] = useState([]);

  useEffect(() => {
    // Recupera le partite in attesa di conferma per l'utente
    axios.get(`/api/games/pending/${user.uid}`).then(res => setPendingMatches(res.data));
  }, [user.uid]);

  const handleConfirm = (gameId) => {
    axios.post('/api/games/confirm-match', { gameId, confirmer: user.uid })
      .then(() => alert('Partita confermata'))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Partite in attesa di conferma</h2>
      <ul>
        {pendingMatches.map(match => (
          <li key={match._id}>
            Partita contro {match.player2} - <button onClick={() => handleConfirm(match._id)}>Conferma</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConfirmMatch;
