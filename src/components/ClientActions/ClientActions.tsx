import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { creditCardType } from "../../helpers/creditCardType";
import CreditCardChipIcon from "../../images/svg/CreditCardChipIcon";
import SearchIcon from "../../images/svg/SearchIcon";
import { getLenderCards } from "../../redux/actions/loans";
import { RootStateType } from "../../redux/reducers";
import Carousel from "../Carousel/Carousel";

const ClientActions: React.FC = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { cards, loanerCards } = useSelector((state: RootStateType) => ({
    cards: state.cards.cards,
    loanerCards: state.loans.lonerCards
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

  useEffect(() => {
    dispatch(getLenderCards());
  }, [dispatch]);

  // const cardsNoWithDiv = cards
  //   .filter((card) => {
  //     return card.card_no.toLowerCase().includes(search.toLowerCase());
  //   })
  //   .map((card) => {
  //     return (
  //       <div
  //         aria-hidden="true"
  //         className="test"
  //         key={card.card_id}
  //         onClick={() => console.log(card.card_id)}
  //       >
  //         {card.card_no}
  //       </div>
  //     );
  //   });

  const cardsNoWithDiv = cards.map((card) => {
    const slide = React.createRef<HTMLDivElement>();
    const handleMouseMove = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>
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
    return (
      <div
        aria-hidden="true"
        className="credit-card"
        key={card.card_id}
        onClick={() => console.log(card.card_id)}
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
      </div>
    );
  });

  const loanerCardsWithDiv = loanerCards.map((card) => {
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

  // const filteredCards = cardsNoWithDiv.filter((card) =>
  //   card.props.children.toLowerCase().includes(search.toLowerCase())
  // );
  // console.log("filteredCards: ", filteredCards);

  // const filteredCards = cards
  //   .filter((card) => {
  //     return card.card_no.toLowerCase().includes(search.toLowerCase());
  //   })
  //   .map((card) => {
  //     return card.card_no;
  //   });

  return (
    <div className="client-actions">
      <SearchIcon />
      <input
        type="text"
        placeholder="Search"
        onChange={handleChange}
        value={search}
      />
      <h3>Your cards</h3>
      <div style={{ width: "350px", height: "200px", marginBottom: "50px" }}>
        <Carousel>{cardsNoWithDiv}</Carousel>
      </div>
      <h3>Loan money</h3>
      <div className="client-actions-loan">
        <div style={{ width: "350px", height: "200px", marginBottom: "50px" }}>
          <Carousel>{loanerCardsWithDiv}</Carousel>
        </div>
      </div>

      <div className="client-actions-deposit">
        <Link to="/deposit" className="client-actions-deposit-deposit-link">
          Make deposit
        </Link>
      </div>
    </div>
  );
};

export default ClientActions;
