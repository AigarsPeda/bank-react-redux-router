import React, { useState } from "react";
import { useSelector } from "react-redux";
import SearchIcon from "../../images/svg/SearchIcon";
import { RootStateType } from "../../redux/reducers";

const ClientActions: React.FC = () => {
  const [search, setSearch] = useState("");
  const { cards } = useSelector((state: RootStateType) => ({
    cards: state.cards.cards
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

  const filteredCards = cards.filter((card) =>
    card.card_no.toLowerCase().includes(search.toLowerCase())
  );

  const cardsNo = cards.map((card) => {
    return (
      <div className="test" key={card.card_id}>
        {card.card_no}
      </div>
    );
  });

  return (
    <div className="client-actions">
      <SearchIcon />
      <input
        type="text"
        placeholder="Search"
        onChange={handleChange}
        value={search}
      />

      {/* {filteredCards.map((card) => {
        return (
          <div key={card.card_id}>
            <div className="card-container">
              <div className="card">{card.card_no}</div>
            </div>
          </div>
        );
      })} */}
    </div>
  );
};

export default ClientActions;
