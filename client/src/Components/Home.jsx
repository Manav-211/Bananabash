import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css"; // Import the CSS file

function Home() {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(location.state?.user);
    const [loading, setLoading] = useState(!user);

    useEffect(() => {
        if (!user) {
            axios.get('http://localhost:3001/user', { withCredentials: true })
                .then(response => {
                    if (response.data.user) {
                        setUser(response.data.user);
                    } else {
                        navigate("/login");
                    }
                })
                .catch(() => navigate("/login"))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [user, navigate]);

    const handlePlayGame = () => {
        navigate("/bananabash"); // Navigate to the game page
    };

    if (loading) {
        return <center><h1>Loading...</h1></center>;
    }

    const handleGoToInstructions = () => {
        navigate("/instructions"); // Navigate to the instructions page
      };

      return (
        <div className="home-container">
          <h1 className="welcome-text">
            Welcome Home {user && user.name} !!!
          </h1>
          <button className="play-game-button" onClick={handlePlayGame}>
            Play Game
          </button>
          <button className="instructions-button" onClick={handleGoToInstructions}>
            View Instructions
          </button>
        </div>
      );
}

export default Home;
