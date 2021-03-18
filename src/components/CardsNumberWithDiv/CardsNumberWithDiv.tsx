import React from "react";
import { Link } from "react-router-dom";
import { creditCardType } from "../../helpers/creditCardType";
import CreditCardChipIcon from "../../images/svg/CreditCardChipIcon";
import { ICards } from "../../types";

export const cardsNumberWithDiv = (cards: ICards[]): JSX.Element[] => {
  const slide = React.createRef<HTMLAnchorElement>();
  const handleMouseMove = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const el = slide.current;
    if (el === null) return;
    const r = el?.getBoundingClientRect();
    el.style.setProperty(
      "--x",
      (event.clientX - (r.left + Math.floor(r.width / 2))).toString()
    );
    el.style.setProperty(
      "--y",
      (event.clientY - (r.top + Math.floor(r.height / 2))).toString()
    );
  };

  const formatNumber = (cardsNumber: string) => {
    let formattedCardNumber = "";
    // cardsNumber = cardsNumber.replace(/\s/g, "");

    for (let i = 0; i < cardsNumber.length; i++) {
      if (i % 4 === 0 && i > 0) {
        formattedCardNumber = formattedCardNumber.concat(" ");
      }
      formattedCardNumber = formattedCardNumber.concat(cardsNumber[i]);
    }

    return formattedCardNumber;
  };

  const handleMouseLeave = () => {
    slide.current?.style.setProperty("--x", "0");
    slide.current?.style.setProperty("--y", "0");
  };

  return cards.map((card) => {
    return (
      <Link
        to={`/deposit/${card.card_id}`}
        aria-hidden="true"
        className="credit-card"
        key={card.card_id}
        ref={slide}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="credit-card-bank">
          <div>{card.bank_name}</div>
          <div>{creditCardType(card.card_no)}</div>
        </div>
        <div className="credit-card-number">
          <CreditCardChipIcon />
          {formatNumber(card.card_no)}
        </div>
        <div className="credit-card-balance">Balance: {card.total_balance}</div>
      </Link>
    );
  });
};
