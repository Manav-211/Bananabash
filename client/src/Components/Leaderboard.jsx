
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Leaderboard.css';

// function Leaderboard() {
//   const [leaderboard, setLeaderboard] = useState([]);

//   const fetchLeaderboard = async () => {
//     try {
//       const response = await axios.get('http://localhost:3001/api/leaderboard');
//       setLeaderboard(response.data);
//     } catch (error) {
//       console.error("Error fetching leaderboard:", error);
//     }
//   };
  

//   useEffect(() => {
//     fetchLeaderboard();
//   }, []);

//   return (
//     <div className="leaderboard-page">
//       <div className="leaderboard-container">
//         <h2 className="leaderboard-title">Leaderboard</h2>
//         {/* Header Row for Columns */}
//         <div className="leaderboard-headers">
//           <span className="header-name">Username</span>
//           <span className="header-score">Score</span>
//         </div>
//         {/* List of Leaderboard Entries */}
//         <div className="leaderboard-list">
//           {leaderboard.map((entry, index) => (
//             <div key={index} className="leaderboard-entry">
//               <span className="entry-name">{entry.name}</span>
//               <span className="entry-score">{entry.highestScore}</span>
//             </div>
//           ))}
//         </div>
//       </div>
      
//     </div>
//   );
// }

// export default Leaderboard;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import axios from 'axios';
import './Leaderboard.css';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/leaderboard');
      setLeaderboard(response.data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard-page">
      <div className="leaderboard-container">
        <h2 className="leaderboard-title">Leaderboard</h2>
        {/* Header Row for Columns */}
        <div className="leaderboard-headers">
          <span className="header-name">Username</span>
          <span className="header-score">Score</span>
        </div>
        {/* List of Leaderboard Entries */}
        <div className="leaderboard-list">
          {leaderboard.map((entry, index) => (
            <div key={index} className="leaderboard-entry">
              <span className="entry-name">{entry.name}</span>
              <span className="entry-score">{entry.highestScore}</span>
            </div>
          ))}
        </div>
        {/* Play Again Button */}
        <div className="play-again-container">
          <Link to="/bananabash" className="play-again-button">
            Play Again
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
