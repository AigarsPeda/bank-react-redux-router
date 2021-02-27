import { ICards } from "../../types";

// ERROR TYPES
export const SET_LONER_CARDS = "SET_LONER_CARDS";
interface ISetLonerCardsAction {
  type: typeof SET_LONER_CARDS;
  payload: ICards[];
}

export const CLEAR_LOANS_DATA = "CLEAR_LOANS_DATA";
interface IClearLonerAction {
  type: typeof CLEAR_LOANS_DATA;
}
export type SetLoansActionTypes = ISetLonerCardsAction | IClearLonerAction;
