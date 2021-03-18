import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCards } from "../../redux/actions/cards";
import { getLenderCards } from "../../redux/actions/loans";
import { RootStateType } from "../../redux/reducers";
import { cardsNumberWithDiv } from "../CardsNumberWithDiv/CardsNumberWithDiv";
import Carousel from "../Carousel/Carousel";
import { loanerCardsWithDiv } from "../LoanerCardsWithDiv/LoanerCardsWithDiv";

const ClientActions: React.FC = () => {
  const dispatch = useDispatch();
  const { cards, loanerCards } = useSelector((state: RootStateType) => ({
    cards: state.cards.cards,
    loanerCards: state.loans.lonerCards
  }));

  useEffect(() => {
    dispatch(getCards());
    dispatch(getLenderCards());
  }, [dispatch]);

  return (
    <div className="client-actions">
      <h3>Your cards:</h3>
      <div style={{ width: "350px", height: "200px", marginBottom: "50px" }}>
        {cards.length > 0 ? (
          <Carousel>{cardsNumberWithDiv(cards)}</Carousel>
        ) : (
          <div>No cards</div>
        )}
      </div>
      <h3>Loan money:</h3>
      <div className="client-actions-loan">
        <div style={{ width: "350px", height: "200px", marginBottom: "50px" }}>
          {loanerCards.length > 0 ? (
            <Carousel>{loanerCardsWithDiv(loanerCards)}</Carousel>
          ) : (
            <div>No cards</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientActions;
