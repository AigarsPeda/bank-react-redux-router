import React from "react";
import { creditCardType } from "../../helpers/creditCardType";
import CreditCardChipIcon from "../../images/svg/CreditCardChipIcon";
import { ICards } from "../../types";

export const loanerCardsWithDiv = (loanerCards: ICards[]): JSX.Element[] => {
  return loanerCards.map((card) => {
    return (
      <div key={card.card_id} className="loaner-card">
        <div className="loaner-card-bank">
          <div>{card.bank_name}</div>
          <div>{creditCardType(card.card_no)}</div>
        </div>
        <div className="loaner-card-number">
          <CreditCardChipIcon /> {card.card_no}
        </div>
        <div className="loaner-card-balance">Balance: {card.total_balance}</div>
      </div>
    );
  });
};
