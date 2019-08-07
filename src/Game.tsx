import React, { useState } from 'react';
import './Game.css';
import ScorePanel from './ScorePanel';
import Deck from './Deck';

const Game: React.FC = () => {
  let [cards, setCards] = useState([
    'fa-diamond',
    'fa-paper-plane-o',
    'fa-anchor',
    'fa-bolt',
    'fa-cube',
    'fa-anchor',
    'fa-leaf',
    'fa-bicycle',
    'fa-diamond',
    'fa-bomb',
    'fa-leaf',
    'fa-bomb',
    'fa-bolt',
    'fa-bicycle',
    'fa-paper-plane-o',
    'fa-cube'
  ]);
  return (
    <div className="container">
      <header>
        <h1>Matching Game</h1>
      </header>
      <ScorePanel />
      <Deck cards={cards} />
    </div>
  );
}

export default Game;
