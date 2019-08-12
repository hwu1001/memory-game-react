import React from 'react';

interface ScorePanelProps {
  minutesDisplay: string,
  secondsDisplay: string,
  moves: string,
  stars: string[][],
  resetCb: () => void
}

const ScorePanel: React.FC<ScorePanelProps> = (props) => {
  return (
    <section className="score-panel">
      <ul className="stars">
        {props.stars.map((clsNames, i) => <li key={i}><i className={clsNames.join(' ')}></i></li>)}
      </ul>
        <span className="moves">{props.moves}</span> Moves 
        <span className="timer">
          Timer:
          <span id="minutes">{props.minutesDisplay}</span>:<span id="seconds">{props.secondsDisplay}</span>
        </span>
        <div className="restart">
          <i className="fa fa-repeat" onClick={props.resetCb}></i>
        </div>
    </section>
  );
}

export default ScorePanel;
