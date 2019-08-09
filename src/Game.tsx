import React, { useState, useEffect } from 'react';
import './Game.css';
import ScorePanel from './ScorePanel';
import Card from './Card';

interface ICard {
  icon: string,
  classNames: string[]
}

const Game: React.FC = () => {
  let [cards, setCards] = useState<ICard[]>([
    {
      icon: 'fa-diamond',
      classNames: []
    },
    {
      icon: 'fa-paper-plane-o',
      classNames: []
    },
    {
      icon: 'fa-anchor',
      classNames: []
    },
    {
      icon: 'fa-bolt',
      classNames: []
    },
    {
      icon: 'fa-cube',
      classNames: []
    },
    {
      icon: 'fa-anchor',
      classNames: []
    },
    {
      icon: 'fa-leaf',
      classNames: []
    },
    {
      icon: 'fa-bicycle',
      classNames: []
    },
    {
      icon: 'fa-diamond',
      classNames: []
    },
    {
      icon: 'fa-bomb',
      classNames: []
    },
    {
      icon: 'fa-leaf',
      classNames: []
    },
    {
      icon: 'fa-bomb',
      classNames: []
    },
    {
      icon: 'fa-bolt',
      classNames: []
    },
    {
      icon: 'fa-bicycle',
      classNames: []
    },
    {
      icon: 'fa-paper-plane-o',
      classNames: []
    },
    {
      icon: 'fa-cube',
      classNames: []
    }
  ]);
  let [seconds, setSeconds] = useState(0);
  let [isTimerActive, setIsTimerActive] = useState(false);
  // let [openCardIndex, setOpenCardIndex] = useState<number>(-1);

  const handeCardClick = (index: number) => {
    if (cards[index].classNames.includes('open')) {
      return;
    }

    // Start the game timer if this is the first action
    if (!isTimerActive) {
      toggleTimer();
    }
    let cardsCopy = cards.slice(0, cards.length);
    let clickedCardClsNames = cards[index].classNames.slice(0, cards[index].classNames.length);

    toggleShowCardClasses(clickedCardClsNames);
    cardsCopy[index].classNames = clickedCardClsNames;
    setCards(cardsCopy);
    // Either the player has an active card open already or doesn't
    // if (openCardIndex > -1) {
    //   toggleShowCardClasses(clickedCardClsNames);
    // } else {
    //   toggleShowCardClasses(clickedCardClsNames);
    // }
  };

  // const addMatchedPair = (firstCardCls: string[], secondCardCls: string[]) => {
  //   toggleShowCardClasses(firstCardCls);
  //   toggleMatchBounce(firstCardCls);
  //   toggleMatchBounce(secondCardCls);
  // }

  // const toggleMatchBounce = (arr: string[]) => {
  //   for (const iterator of ['match', 'animated', 'bounce']) {
  //     toggleClass(arr, iterator);
  //   }
  // }

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
