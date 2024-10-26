import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Toast, ToastContainer } from 'react-bootstrap';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5001/api/games/leaderboard')
      .then(res => {
        if (Array.isArray(res.data.users)) {
          setUsers(res.data.users);
        } else {
          setError('Unexpected response format');
          setShowToast(true);
          console.error('Unexpected response format:', res.data);
        }
      })
      .catch(err => {
        setError('Errore nel recupero della classifica. Riprova più tardi.');
        setShowToast(true);
        console.error(err);
      });
  }, []);

  return (
    <div>
      <h2>Classifica ELO</h2>
      <ul>
        {users.map((user, index) => (
          <li key={user.uid}>{index + 1}. {user.name} - ELO: {user.eloScore.toFixed(0)}</li>
        ))}
      </ul>
      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Body>{error}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default Leaderboard;
