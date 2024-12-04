import React from "react";
import { useNavigate } from "react-router-dom";
import "./Instructions.css"; 

function Instructions() {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate("/bananabash"); 
  };

  return (
    <div className="instructions-container">
      <h1 className="instructions-title">How to Play BananaBash</h1>
      <table className="instructions-table">
        <thead>
          <tr>
            <th>Step</th>
            <th>Instructions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Click on the numbers shown to match the correct answer displayed with the image.</td>
          </tr>
          <tr>
            <td>2</td>
            <td>If the answer is correct, you will earn a point!</td>
          </tr>
          <tr>
            <td>3</td>
            <td>If the answer is wrong, you will lose one life.</td>
          </tr>
          <tr>
            <td>4</td>
            <td>You have 30 seconds to make your guesses, so be quick!</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Once your lives run out, the game will end, and you can view your score.</td>
          </tr>
        </tbody>
      </table>
      <button className="start-game-button" onClick={handleStartGame}>
        Take Me to the Game!
      </button>
    </div>
  );
}

export default Instructions;
