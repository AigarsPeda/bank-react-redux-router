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

  const creditCardType = (cc: string) => {
    const amex = new RegExp("^3[47][0-9]{13}$");
    const visa = new RegExp("^4[0-9]{12}(?:[0-9]{3})?$");
    const cup1 = new RegExp("^62[0-9]{14}[0-9]*$");
    const cup2 = new RegExp("^81[0-9]{14}[0-9]*$");

    const mastercard = new RegExp("^5[1-5][0-9]{14}$");
    const mastercard2 = new RegExp("^2[2-7][0-9]{14}$");

    const disco1 = new RegExp("^6011[0-9]{12}[0-9]*$");
    const disco2 = new RegExp("^62[24568][0-9]{13}[0-9]*$");
    const disco3 = new RegExp("^6[45][0-9]{14}[0-9]*$");

    const diners = new RegExp("^3[0689][0-9]{12}[0-9]*$");
    const jcb = new RegExp("^35[0-9]{14}[0-9]*$");

    if (visa.test(cc)) {
      return "VISA";
    }
    if (amex.test(cc)) {
      return "AMEX";
    }
    if (mastercard.test(cc) || mastercard2.test(cc)) {
      return "MASTERCARD";
    }
    if (disco1.test(cc) || disco2.test(cc) || disco3.test(cc)) {
      return "DISCOVER";
    }
    if (diners.test(cc)) {
      return "DINERS";
    }
    if (jcb.test(cc)) {
      return "JCB";
    }
    if (cup1.test(cc) || cup2.test(cc)) {
      return "CHINA_UNION_PAY";
    }
    return undefined;
  };

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
