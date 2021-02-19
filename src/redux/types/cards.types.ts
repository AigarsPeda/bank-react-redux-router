import { ICards } from "../../types";

// CARDS
export const SET_CARDS_DATA = "SET_CARDS_DATA";
interface ISetCardsAction {
  type: typeof SET_CARDS_DATA;
  payload: ICards[];
}

export const CLEAR_CARDS_DATA = "CLEAR_CARDS_DATA";
interface IClearCardsAction {
  type: typeof CLEAR_CARDS_DATA;
}

export type CardsActionTypes = ISetCardsAction | IClearCardsAction;
