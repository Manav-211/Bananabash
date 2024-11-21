
// // ThankYouPage.jsx

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ThankYouPage.css';

function ThankYouPage() {
  const { state } = useLocation();
  const { username, score } = state || {};
  const navigate = useNavigate();

  return (
    <div className="thank-you-container">
      <h1>Thank You for Playing!</h1>
      <p>Better luck next time, {username}!</p>
      <p>Your final score: {score}</p>
      <button onClick={() => navigate('/leaderboard')} className="leaderboard-button">
        Go to Leaderboard
      </button>
    </div>
  );
}

export default ThankYouPage;
ThankYouPage.jsx

