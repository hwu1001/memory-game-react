import React, { useState, useEffect } from 'react';
import './Game.css';
import { ICard, STARTING_CARDS, STARTING_STARS } from './GameStart';
import ScorePanel from './ScorePanel';
import WinModal from './WinModal';
import Card from './Card';

const Game: React.FC = () => {
  // TODO: Consolidate some of this state, many updates can happen together
  let [cards, setCards] = useState<ICard[]>(STARTING_CARDS);
  let [seconds, setSeconds] = useState(0);
  let [isTimerActive, setIsTimerActive] = useState(false);
  let [openCardIndex, setOpenCardIndex] = useState<number>(-1);
  let [openBadMatch, setOpenBadMatch] = useState(false);
  let [movesCounter, setMovesCounter] = useState(0);
  let [stars, setStars] = useState(STARTING_STARS);
  let [starCounter, setStarCounter] = useState(3);
  let [numMatchedCards, setNumMatchedCards] = useState(0);

  const handeCardClick = (clickedCardIndex: number) => {
    // If a card is already selected or it's been matched then ignore click
    if (cards[clickedCardIndex].classNames.includes('open') || cards[clickedCardIndex].classNames.includes('match') || openBadMatch) {
      return;
    }

    // Start the game timer if this is the first action
    if (!isTimerActive) {
      toggleTimer();
    }
    // This is a new array, but the objects in it are references, not copies
    let cardsCopy = cards.slice(0, cards.length);
    let clickedClsNamesCopy = cards[clickedCardIndex].classNames.slice(0, cards[clickedCardIndex].classNames.length);
    // Either the player has an active card open already or doesn't
    if (openCardIndex > -1) {
      let openClsNamesCopy = cards[openCardIndex].classNames.slice(0, cards[openCardIndex].classNames.length);
      const _setPair = () => {
        // Create copies of the relevant cards
        let openObjCopy = createICardCopy(cardsCopy[openCardIndex]);
        openObjCopy.classNames = openClsNamesCopy;
        let clickedObjCopy = createICardCopy(cardsCopy[clickedCardIndex]);
        clickedObjCopy.classNames = clickedClsNamesCopy;
        // Reference those copies instead of the originals
        cardsCopy[openCardIndex] = openObjCopy;
        cardsCopy[clickedCardIndex] = clickedObjCopy;
        setCards(cardsCopy);
      };

      // Is this a matching card?
      if (cardsCopy[clickedCardIndex].icon === cardsCopy[openCardIndex].icon) {
        addMatchedPair(openClsNamesCopy, clickedClsNamesCopy);
        _setPair();
      } else {
        toggleShowCardClasses(openClsNamesCopy);
        toggleBadMatchPair(openClsNamesCopy, clickedClsNamesCopy);
        setOpenBadMatch(true);
        // Using a closure, otherwise there's a lot of variables to pass the callback
        // on the setTimeout call
        const badMatchTimeout = () => {
          toggleBadMatchPair(openClsNamesCopy, clickedClsNamesCopy);
          _setPair();
          setOpenBadMatch(false);
        }
        setTimeout(badMatchTimeout, 1000);
        _setPair();
      }
      // Clear open card for next set of selections
      setOpenCardIndex(-1);
      setMovesCounter(movesCounter + 1);
      updateStars();
    } else { // First card of a pair clicked
      toggleShowCardClasses(clickedClsNamesCopy);
      let curObjCopy = createICardCopy(cardsCopy[clickedCardIndex]);
      curObjCopy.classNames = clickedClsNamesCopy;
      cardsCopy[clickedCardIndex] = curObjCopy;
      setOpenCardIndex(clickedCardIndex);
      setCards(cardsCopy);
      setMovesCounter(movesCounter + 1);
      updateStars();
    }
  };

  const createICardCopy = (origCard: ICard): ICard => {
    return { icon: origCard.icon, classNames: origCard.classNames.slice(0, origCard.classNames.length) };
  };

  const updateStars = () => {
    if (starCounter > 1 && (movesCounter === 23 || movesCounter === 33)) {
      let starCopy = stars.slice(0, stars.length);
      let starClsCopy = starCopy[starCounter - 1].slice(0, starCopy[starCounter - 1].length);
      for (const iterator of ['fa-star', 'fa-star-o']) {
        toggleClass(starClsCopy, iterator);
      }
      starCopy[starCounter - 1] = starClsCopy
      setStarCounter(starCounter - 1);
      setStars(starCopy);
    }
  }

  const addMatchedPair = (firstCardCls: string[], secondCardCls: string[]) => {
    toggleShowCardClasses(firstCardCls);
    toggleMatchBounce(firstCardCls);
    toggleMatchBounce(secondCardCls);
    setNumMatchedCards(numMatchedCards + 2);
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
    setMovesCounter(0);
    setStarCounter(3);
    setStars(STARTING_STARS);
    setCards(shuffle(STARTING_CARDS));
    setNumMatchedCards(0);
  };

  const padTimeString = (val: number): string => {
    let valStr = val + '';
    if (valStr.length < 2) {
      return '0' + valStr;
    } else {
      return valStr;
    }
  };

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

  // TODO: Look into whether useEffect or useReducer should be used on more of the logic above
  // Not sure what should be just done through `set...` calls outside and in useEffect
  useEffect(() => {
    let interval: number | undefined;
    const t: TimerHandler = () => {
      setSeconds(seconds => seconds + 1);
    };

    if (isTimerActive && numMatchedCards < 16) {
      interval = setInterval(t, 1000);
    } else if (!isTimerActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, seconds, numMatchedCards]);

  useEffect(() => {
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
        moves={movesCounter.toString()}
        stars={stars}
        resetCb={reset}
      />
      {numMatchedCards === 16
        ? <WinModal
          minutes={padTimeString(Math.floor(seconds / 60))}
          seconds={padTimeString(Math.floor(seconds % 60))}
          moves={movesCounter.toString()}
          stars={starCounter.toString()}
          playAgainCb={reset}
        />
        : null
      }
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
