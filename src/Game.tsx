import React, { useState } from 'react';
import './Game.css';
import ScorePanel from './ScorePanel';
import Deck from './Deck';

const shuffle = (arr: Array<string>) => {
  let retArr = arr.slice(0, arr.length);
  let curIndex = retArr.length;
  let tempValue: string;
  let randomIndex: number;
  while (curIndex !== 0) {
    randomIndex = Math.floor(Math.random() * curIndex);
    curIndex -= 1;
    tempValue = retArr[curIndex];
    retArr[curIndex] = retArr[randomIndex];
    retArr[randomIndex] = tempValue;
  }
  return retArr;
};

const Game: React.FC = () => {
  let [cards, setCards] = useState(shuffle([
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
  ]));

  
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
