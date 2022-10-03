import React from "react";
import "./Card.css";
export const Card = ({ card, HandelCoice, flipped, disable }) => {
  const onClick = () => {
    if (!disable) {
      HandelCoice(card);
    }
  };

  return (
    <div className="cardItem">
      <div className={flipped ? "show" : ""} >
        <img src={card.src} alt="front" className="front" />
        <img
          src="./images/back.jpg"
          alt="back"
          className="back"
          onClick={onClick}
        />
      </div>
    </div>
  );
};
