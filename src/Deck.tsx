import React from 'react';
import Card from './Card';

interface DeckProps {
  cards: Array<string>
}

const Deck: React.FC<DeckProps> = (props) => {
  const { cards } = props;
  return (
    <ul className="deck">
      {cards.map((icon, index) => <Card key={index} icon={icon}/>)}
    </ul>
  );
}

export default Deck;
