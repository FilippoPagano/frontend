import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ConfirmMatch = ({ user }) => {
  const [pendingMatches, setPendingMatches] = useState([]);

  useEffect(() => {
    axios.get(`/api/games/pending/${user.uid}`).then(res => setPendingMatches(res.data));
  }, [user.uid]);

  const handleConfirm = (gameId) => {
    axios.post('http://localhost:5001/api/games/confirm-match', { gameId, confirmer: user.uid })
      .then(() => alert('Partita confermata'))
      .catch(err => console.error(err));
  };

  return (
    <div className="mt-4">
      <h2>Partite in attesa di conferma</h2>
      <ul className="list-group">
        {pendingMatches.map(match => (
          <li key={match._id} className="list-group-item d-flex justify-content-between align-items-center">
            Partita contro {match.player2}
            <button onClick={() => handleConfirm(match._id)} className="btn btn-success">Conferma</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConfirmMatch;
