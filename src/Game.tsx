import React, { useState, useEffect } from 'react';
import './Game.css';
import { ICard, STARTING_CARDS } from './ICard';
import ScorePanel from './ScorePanel';
import Card from './Card';

const Game: React.FC = () => {
  let [cards, setCards] = useState<ICard[]>(STARTING_CARDS);
  let [seconds, setSeconds] = useState(0);
  let [isTimerActive, setIsTimerActive] = useState(false);
  let [openCardIndex, setOpenCardIndex] = useState<number>(-1);

  const handeCardClick = (index: number) => {
    if (cards[index].classNames.includes('open') || cards[index].classNames.includes('match')) {
      return;
    }

    // Start the game timer if this is the first action
    if (!isTimerActive) {
      toggleTimer();
    }
    let cardsCopy = cards.slice(0, cards.length);
    let clickedClsNamesCopy = cards[index].classNames.slice(0, cards[index].classNames.length);
    // Either the player has an active card open already or doesn't
    if (openCardIndex > -1) {
      let openClsNamesCopy = cards[openCardIndex].classNames.slice(0, cards[openCardIndex].classNames.length);
      const _setPair = () => {
        cardsCopy[openCardIndex].classNames = openClsNamesCopy;
        cardsCopy[index].classNames = clickedClsNamesCopy;
        setCards(cardsCopy);
      };

      // Is this a matching card?
      if (cardsCopy[index].icon === cardsCopy[openCardIndex].icon) {
        addMatchedPair(openClsNamesCopy, clickedClsNamesCopy);
        _setPair();
      } else {
        toggleShowCardClasses(openClsNamesCopy);
        toggleBadMatchPair(openClsNamesCopy, clickedClsNamesCopy);
        // Using a closure, otherwise there's a lot of variables to pass the callback
        // on the setTimeout call
        const badMatchTimeout = () => {
          toggleBadMatchPair(openClsNamesCopy, clickedClsNamesCopy);
          _setPair();
        }
        setTimeout(badMatchTimeout, 1000);
        _setPair();
      }
      setOpenCardIndex(-1);
    } else { // First card of a pair clicked
      toggleShowCardClasses(clickedClsNamesCopy);
      cardsCopy[index].classNames = clickedClsNamesCopy;
      setOpenCardIndex(index);
      setCards(cardsCopy);
    }
  };

  const addMatchedPair = (firstCardCls: string[], secondCardCls: string[]) => {
    toggleShowCardClasses(firstCardCls);
    toggleMatchBounce(firstCardCls);
    toggleMatchBounce(secondCardCls);
  }

  const toggleMatchBounce = (arr: string[]) => {
    for (const iterator of ['match', 'animated', 'bounce']) {
      toggleClass(arr, iterator);
    }
  }

  const toggleBadMatchPair = (firstCardCls: string[], secondCardCls: string[]) => {
    toggleBadMatch(firstCardCls);
    toggleBadMatch(secondCardCls);
  };

  const toggleBadMatch = (arr: string[]) => {
    for (const iterator of ['open', 'show', 'bad-match', 'animated', 'shake']) {
      toggleClass(arr, iterator);
    }
  };

  const toggleShowCardClasses = (arr: string[]) => {
    for (const iterator of ['open', 'show', 'animated', 'flipInY']) {
      toggleClass(arr, iterator);
    }
  };

  const toggleClass = (arr: string[], cls: string) => {
    let i = arr.indexOf(cls);
    if (i > -1) {
      arr.splice(i, 1);
    } else {
      arr.push(cls);
    }
  };

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
    };

    if (isTimerActive) {
      interval = setInterval(t, 1000);
    } else if (!isTimerActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, seconds]);

  useEffect(() => {
    const shuffle = (arr: ICard[]) => {
      let retArr = arr.slice(0, arr.length);
      let curIndex = retArr.length;
      let tempValue: ICard;
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
    setCards(c => shuffle(c));
  }, []); // runs only once, not on every re-render


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
      <ul className="deck">
        {cards.map((card, index) => {
        return (
          <Card
            key={index}
            icon={card.icon}
            index={index}
            cardClickCb={handeCardClick}
            cardClassNames={card.classNames} 
          />);
        })}
      </ul>
    </div>
  );
}

export default Game;
