import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/games/leaderboard')
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        setError('Errore nel recupero della classifica. Riprova più tardi.');
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h2>Classifica ELO</h2>
      {error && <p>{error}</p>}
      <ul>
        {users.map((user, index) => (
          <li key={user._id}>{index + 1}. {user.name} - ELO: {user.eloScore.toFixed(0)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
