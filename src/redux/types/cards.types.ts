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

export const LOADING_CARDS_DATA = "LOADING_CARDS_DATA";
interface ILoadingCardsAction {
  type: typeof LOADING_CARDS_DATA;
  payload: boolean;
}

export type CardsActionTypes =
  | ISetCardsAction
  | IClearCardsAction
  | ILoadingCardsAction;
