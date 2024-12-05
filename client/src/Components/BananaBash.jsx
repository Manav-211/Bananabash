
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
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
  const [musicUrl, setMusicUrl] = useState(null);
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();

  // Fetch banana data
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

  // Fetch background music
  const fetchGameMusic = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/music');
      setMusicUrl(response.data.url);
    } catch (error) {
      console.error('Error fetching music:', error);
    }
  };

  // Play music when URL is available
  useEffect(() => {
    if (musicUrl) {
      const newAudio = new Audio(musicUrl);
      newAudio.loop = true; // Enable looping
      newAudio.play();
      setAudio(newAudio);
      setIsPlaying(true);

      
      return () => {
        newAudio.pause();
        newAudio.src = '';
      };
    }
  }, [musicUrl]);

  const toggleMusic = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Timer for the game
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
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

  // Handle user guesses
  const handleGuess = (number) => {
    if (gameOver) return;

    if (number === bananaData.solution) {
      setMessage('Correct Answer!');
      setScore(score + 1);
      fetchBananaData();
    } else {
      setMessage('Wrong Answer. Try Again!');
      setLives((prevLives) => {
        if (prevLives === 1) {
          setGameOver(true);
          handleEndGame(score);
        }
        return prevLives - 1;
      });
    }
  };

  // End game and save score
  const handleEndGame = async (finalScore) => {
    try {
      await axios.post(
        'http://localhost:3001/api/submit-score',
        { userId, score: finalScore },
        { withCredentials: true }
      );
      navigate('/thankyou', { state: { username, score: finalScore } });
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  // Fetch banana data and username on mount
  useEffect(() => {
    fetchBananaData();
    fetchGameMusic();

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

  return (
    <div className="content-wrapper">
      
      {/* Lottie Animation - Floating Bananas */}
      <Player
        autoplay
        loop
        src="https://lottie.host/6a84211c-1fa1-4bb5-9395-4fba655afa58/b2349h2EX0.json" // URL of your Lottie animation
        className="floating-animation top-left"
      />
      <Player
        autoplay
        loop
        src="https://assets2.lottiefiles.com/packages/lf20_iv4dsx3q.json"
        className="floating-animation bottom-right"
      />

      {gameOver ? (
        <p>Redirecting...</p>
      ) : (
        <>
          {bananaData ? (
            <div className="game-container">
              <div className="score-lives-container">
                <div className="lives">Lives: {lives}</div>
                <div className="score">Score: {score}</div>
              </div>
              <p className="number-display">N: {bananaData.solution}</p>
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