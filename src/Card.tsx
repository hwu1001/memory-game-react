import React from 'react';

interface CardProps {
  icon: string
}

const Card: React.FC<CardProps> = (props) => {
  const cls = 'fa ' + props.icon;
  return (
    <li className="card">
        <i className={cls}></i>
    </li>
  );
}

export default Card;
