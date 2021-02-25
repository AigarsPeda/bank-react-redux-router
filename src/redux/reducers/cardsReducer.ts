import { ICards } from "../../types";
import {
  CardsActionTypes,
  CLEAR_CARDS_DATA,
  LOADING_CARDS_DATA,
  SET_CARDS_DATA
} from "../types/cards.types";

export interface ICardsState {
  cards: ICards[];
  loadingCardsData: boolean;
}

//  State
const initialState: ICardsState = {
  cards: [],
  loadingCardsData: false
};

export default (
  state = initialState,
  action: CardsActionTypes
): ICardsState => {
  switch (action.type) {
    case LOADING_CARDS_DATA:
      return {
        ...state,
        loadingCardsData: true
      };

    case SET_CARDS_DATA:
      return {
        ...state,
        cards: action.payload,
        loadingCardsData: false
      };

    case CLEAR_CARDS_DATA:
      return initialState;

    default:
      return state;
  }
};
