import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Toast, ToastContainer } from 'react-bootstrap';

const SubmitMatch = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [opponent, setOpponent] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState(''); // 'success' or 'danger'

  useEffect(() => {
    axios.get('http://localhost:5001/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(err => {
        setError('Errore nel recupero degli utenti. Riprova più tardi.');
        console.error(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      setToastMessage('Devi essere autenticato per registrare una partita');
      setToastVariant('danger');
      setShowToast(true);
      return;
    }
    const winner = result === 'win' ? user.uid : opponent;
    const userName = user.displayName || 'Unknown';
    const opponentName = users.find(u => u.uid === opponent)?.displayName || 'Unknown';
    axios.post(`http://localhost:5001/api/games/match?player1Name=${encodeURIComponent(userName)}&player2Name=${encodeURIComponent(opponentName)}`, { player1: user.uid, player2: opponent, winner })
      .then(() => {
        setToastMessage('Partita inserita in attesa di conferma');
        setToastVariant('success');
        setShowToast(true);
      })
      .catch(err => {
        setToastMessage('Errore nella registrazione della partita. Riprova più tardi.');
        setToastVariant('danger');
        setShowToast(true);
        console.error(err);
      });
  };

  return (
    <>
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
              <option key={user.uid} value={user.uid}>{user.displayName}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Risultato</label>
          <select className="form-control" value={result} onChange={(e) => setResult(e.target.value)}>
            <option value="">Seleziona il risultato</option>
            <option value="win">Hai vinto</option>
            <option value="lose">Hai perso</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Registra</button>
      </form>
      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg={toastVariant}>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default SubmitMatch;