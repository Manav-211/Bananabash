import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BananaBash.css';

function BananaBash() {
  const [bananaData, setBananaData] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const fetchBananaData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/banana');
      setBananaData(response.data);
      setMessage('');
      setTimeLeft(30);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Usage in JSX:
  <p className="timer-text">{formatTime(timeLeft)}</p>
  


  useEffect(() => {
    fetchBananaData();
  }, []);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get('http://localhost:3001/user', { withCredentials: true });
        setUsername(response.data.user.name);
        setUserId(response.data.user.id);
      } catch (error) {
        console.error('Failed to fetch username:', error);
      }
    };
    fetchUsername();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        setProgressPercentage(((30 - prev + 1) / 30) * 360);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [bananaData]);

  const handleGuess = (number) => {
    if (gameOver) return;

    if (number === bananaData.solution) {
      setMessage('Correct Answer!');
      setScore(score + 1);
      fetchBananaData();
    } else {
      setMessage('Wrong Answer. Try Again!');
      setLives(prevLives => {
        if (prevLives === 1) {
          setGameOver(true);
          handleEndGame(score);
        }
        return prevLives - 1;
      });
    }
  };

  const handleEndGame = async (finalScore) => {
    try {
      await axios.post('http://localhost:3001/api/submit-score', {
        userId,
        score: finalScore,
      }, { withCredentials: true });

      // Navigate to ThankYouPage after submitting score
      navigate('/thankyou', { state: { username, score: finalScore } });
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  return (
    <div className="content-wrapper">
      {gameOver ? (
        <p>Redirecting...</p>
      ) : (
        <>
          {bananaData ? (
            <div className="game-container">
              {/* Score and Lives Display */}
              <div className="score-lives-container">
                <div className="lives">Lives: {lives}</div>
                <div className="score">Score: {score}</div>
              </div>

              <p>Number: {bananaData.solution}</p>
              <div className="timer-container">
                <div
                  className="timer-progress"
                  style={{ transform: `rotate(${progressPercentage}deg)` }}
                ></div>
                <p className="timer-text">{timeLeft}s</p>
              </div>
              <img
                src={bananaData.question}
                alt="Banana"
                className="banana-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/150';
                }}
              />
              <div className="buttons-container">
                {[...Array(10).keys()].map((number) => (
                  <button
                    key={number}
                    className="number-button"
                    onClick={() => handleGuess(number)}
                  >
                    {number}
                  </button>
                ))}
              </div>
              {message && <p className="answer-message">{message}</p>}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </>
      )}
    </div>
  );
}

export default BananaBash;
