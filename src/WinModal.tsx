import React from 'react';

interface WinModalProps {
  minutes: string,
  seconds: string,
  moves: string,
  stars: string,
  playAgainCb: () => void;
}

const WinModal: React.FC<WinModalProps> = (props) => {
  const _onClickHandler = () => props.playAgainCb();
  return (
    <div className="modal" id="win-modal">
      <div className="modal-content">
        {/* Check mark comes from this pen: https://codepen.io/elevaunt/pen/JYRBzJ */}
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2">
          <circle className="path circle" fill="none" stroke="#73AF55" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1"
          />
          <polyline className="path check" fill="none" stroke="#73AF55" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10"
            points="100.2,40.2 51.5,88.8 29.8,67.5 " />
        </svg>
        <h2>Congratulations! You Won!</h2>
        <h4>With a time of <span id="modal-min">{props.minutes}</span>:<span id="modal-sec">{props.seconds}</span>, <span id="modal-moves">{props.moves}</span> moves, and <span id="modal-stars">{props.stars}</span> {props.stars === '1' ? 'star': 'stars'}.</h4>
        <h4>Woooo!</h4>
        <button id="modal-button" onClick={_onClickHandler}>Play again!</button>
      </div>
    </div>
  );
}

export default WinModal;
