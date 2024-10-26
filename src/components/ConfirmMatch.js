import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Toast, ToastContainer } from 'react-bootstrap';

const ConfirmMatch = ({ user }) => {
  const [pendingMatches, setPendingMatches] = useState([]);
  const [opponentPendingMatches, setOpponentPendingMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    if (user && user.uid) {
      const userName = user.displayName || 'Unknown';
      // API call to fetch pending matches for the logged-in user
      axios.get(`http://localhost:5001/api/games/pending/${user.uid}?name=${encodeURIComponent(userName)}`)
        .then(res => {
          setPendingMatches(res.data.pendingMatches); // Set the pending matches state
          setOpponentPendingMatches(res.data.opponentPendingMatches); // Set the opponent pending matches state
          setLoading(false); // Set loading to false
        })
        .catch(err => {
          console.error(err);
          setLoading(false); // Set loading to false in case of error
        });
    }
  }, [user]);

  const handleConfirm = (gameId) => {
    // API call to confirm a match
    axios.post('http://localhost:5001/api/games/confirm-match', { gameId, confirmer: user.uid })
      .then(() => {
        setToastMessage('Partita confermata');
        setShowToast(true);
        // Refresh the matches
        const userName = user.displayName || 'Unknown';
        axios.get(`http://localhost:5001/api/games/pending/${user.uid}?name=${encodeURIComponent(userName)}`)
          .then(res => {
            setPendingMatches(res.data.pendingMatches);
            setOpponentPendingMatches(res.data.opponentPendingMatches);
          })
          .catch(err => console.error(err));
      })
      .catch(err => {
        setToastMessage('Errore nella conferma della partita');
        setShowToast(true);
        console.error(err);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-4">
      <h2>Partite in attesa di conferma</h2>
      {pendingMatches.length === 0 && opponentPendingMatches.length === 0 ? (
        <div>Nessuna partita in attesa di conferma.</div>
      ) : (
        <>
          {pendingMatches.length > 0 && (
            <>
              <h3>Partite da confermare</h3>
              <ul className="list-group">
                {pendingMatches.map(match => (
                  <li key={match._id} className="list-group-item d-flex justify-content-between align-items-center">
                    Partita contro {match.player1.name} - Risultato: {match.winner.uid === user.uid ? 'Hai vinto' : 'Hai perso'}
                    <button onClick={() => handleConfirm(match._id)} className="btn btn-success">Conferma</button>
                  </li>
                ))}
              </ul>
            </>
          )}
          {opponentPendingMatches.length > 0 && (
            <>
              <h3>Partite in attesa di conferma dall'avversario</h3>
              <ul className="list-group">
                {opponentPendingMatches.map(match => (
                  <li key={match._id} className="list-group-item d-flex justify-content-between align-items-center">
                    Partita contro {match.player2.name} - Risultato: {match.winner.uid === user.uid ? 'Hai vinto' : 'Hai perso'}
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      )}
      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default ConfirmMatch;
