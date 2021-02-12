import { ICards } from "../../types";
import {
  CardsActionTypes,
  CLEAR_CARDS_DATA,
  SET_CARDS_DATA
} from "../types/cards.types";

export interface ICardsState {
  cards: ICards[];
}

//  State
const initialState: ICardsState = {
  cards: []
};

export default (
  state = initialState,
  action: CardsActionTypes
): ICardsState => {
  switch (action.type) {
    case SET_CARDS_DATA:
      return {
        ...state,
        cards: action.payload
      };

    case CLEAR_CARDS_DATA:
      return initialState;

    default:
      return state;
  }
};
