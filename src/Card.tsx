import React from 'react';

interface CardProps {
  icon: string,
  index: number,
  cardClickCb: (index: number) => void,
  cardClassNames?: string[]
}

const Card: React.FC<CardProps> = (props) => {
  const cls = 'fa ' + props.icon;
  const cardCls = props.cardClassNames ? props.cardClassNames.join(' ') : '';
  
  return (
    <li className={cardCls} onClick={() => props.cardClickCb(props.index)}>
        <i className={cls}></i>
    </li>
  );
}

export default Card;
