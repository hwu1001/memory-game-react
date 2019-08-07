import React from 'react';

const ScorePanel: React.FC = () => {
  return (
    <section className="score-panel">
      <ul className="stars">
        <li><i className="fa fa-star"></i></li>
        <li><i className="fa fa-star"></i></li>
        <li><i className="fa fa-star"></i></li>
      </ul>
        <span className="moves">0</span> Moves 
        <span className="timer">
          Timer:
          <span id="minutes">00</span>:<span id="seconds">00</span>
        </span>
        <div className="restart">
          <i className="fa fa-repeat"></i>
        </div>
    </section>
  );
}

export default ScorePanel;
