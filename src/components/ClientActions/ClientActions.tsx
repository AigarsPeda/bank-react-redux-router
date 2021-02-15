import React, { useState } from "react";
import { useSelector } from "react-redux";
import CreditCardChipIcon from "../../images/svg/CreditCardChipIcon";
import SearchIcon from "../../images/svg/SearchIcon";
import { RootStateType } from "../../redux/reducers";
import Carousel from "../Carousel/Carousel";

const ClientActions: React.FC = () => {
  const [search, setSearch] = useState("");
  const { cards } = useSelector((state: RootStateType) => ({
    cards: state.cards.cards
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

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
        <div className="credit-card-bank">{card.bank_name}</div>
        <div className="credit-card-number">
          <CreditCardChipIcon />
          {formatNumber(card.card_no)}
        </div>
        <div className="credit-card-balance">Balance: {card.total_balance}</div>
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
      <div style={{ width: "350px", height: "200px" }}>
        <Carousel>{cardsNoWithDiv}</Carousel>
      </div>
    </div>
  );
};

export default ClientActions;
