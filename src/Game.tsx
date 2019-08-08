import React, { useState, useEffect } from 'react';
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
  let [seconds, setSeconds] = useState(0);
  let [isTimerActive, setIsTimerActive] = useState(false);

  const toggleTimer = () => {
    setIsTimerActive(!isTimerActive);
  };

  const reset = () => {
    setSeconds(0);
    setIsTimerActive(false);
  };

  const padTimeString = (val: number): string => {
    let valStr = val + '';
    if (valStr.length < 2) {
      return '0' + valStr;
    } else {
      return valStr;
    }
  };

  useEffect(() => {
    let interval: number | undefined;
    const t: TimerHandler = () => {
      setSeconds(seconds => seconds + 1);
      console.log(seconds);
    };

    if (isTimerActive) {
      interval = setInterval(t, 1000);
    } else if (!isTimerActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, seconds]);

  useEffect(() => {
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
    setCards(c => shuffle(c)); // runs only once, not on every re-render
  }, []);

  
  return (
    <div className="container">
      <header>
        <h1 onClick={toggleTimer}>Matching Game</h1>
      </header>
      <ScorePanel
        minutesDisplay={padTimeString(Math.floor(seconds / 60))}
        secondsDisplay={padTimeString(Math.floor(seconds % 60))}
        resetCb={reset}
      />
      <Deck cards={cards} />
    </div>
  );
}

export default Game;
