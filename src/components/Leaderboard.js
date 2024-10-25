import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/games/leaderboard').then(res => {
      setUsers(res.data);
    });
  }, []);

  return (
    <div>
      <h2>Classifica ELO</h2>
      <ul>
        {users.map((user, index) => (
          <li key={user._id}>{index + 1}. {user.name} - ELO: {user.eloScore.toFixed(0)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
