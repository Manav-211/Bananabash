// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Home.css"; // Import the CSS file

// function Home() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [user, setUser] = useState(location.state?.user);
//     const [loading, setLoading] = useState(!user);

//     useEffect(() => {
//         if (!user) {
//             axios.get('http://localhost:3001/user', { withCredentials: true })
//                 .then(response => {
//                     if (response.data.user) {
//                         setUser(response.data.user);
//                     } else {
//                         navigate("/login");
//                     }
//                 })
//                 .catch(() => navigate("/login"))
//                 .finally(() => setLoading(false));
//         } else {
//             setLoading(false);
//         }
//     }, [user, navigate]);

//     const handlePlayGame = () => {
//         navigate("/bananabash"); // Navigate to the game page
//     };

//     if (loading) {
//         return <center><h1>Loading...</h1></center>;
//     }

//     const handleGoToInstructions = () => {
//         navigate("/instructions"); // Navigate to the instructions page
//       };

//       return (
//         <div className="home-container">
//           <h1 className="welcome-text">
//             Welcome Home {user && user.name} !!!
//           </h1>
//           <button className="play-game-button" onClick={handlePlayGame}>
//             Play Game
//           </button>
//           <button className="instructions-button" onClick={handleGoToInstructions}>
//             View Instructions
//           </button>
//         </div>
//       );
// }

// export default Home;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";
import "./Home.css";

function Home() {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(location.state?.user);
    const [loading, setLoading] = useState(!user);
    const [animationData, setAnimationData] = useState(null);

    useEffect(() => {
        if (!user) {
            axios.get("http://localhost:3001/user", { withCredentials: true })
                .then((response) => {
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

    useEffect(() => {
        const fetchAnimation = async () => {
            try {
                const response = await axios.get(
                    "https://lottie.host/06ffdb63-2709-4ba6-9eba-2cad34f7a088/uRGn8RLzwM.json"
                );
                setAnimationData(response.data);
            } catch (error) {
                console.error("Error fetching animation:", error);
            }
        };

        fetchAnimation();
    }, []);

    const handlePlayGame = () => {
        navigate("/bananabash");
    };

    const handleGoToInstructions = () => {
        navigate("/instructions");
    };

    if (loading) {
        return (
            <center>
                <h1>Loading...</h1>
            </center>
        );
    }

    return (
        <div className="home-container">
            <div className="animation-overlay">
                {animationData && (
                    <Lottie
                        animationData={animationData}
                        loop={true}
                        speed={0.5} // Slows down the animation
                        style={{ height: 200, width: 200 }}
                    />
                )}
            </div>
            <h1 className="welcome-text">Welcome Home {user && user.name} !!!</h1>
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

