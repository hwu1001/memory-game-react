import React from 'react';
import './Game.css';
import ScorePanel from './ScorePanel';

const Game: React.FC = () => {
  return (
    <div className="container">
      <header>
        <h1>Matching Game</h1>
      </header>
      <ScorePanel />
    </div>
  );
}

export default Game;
