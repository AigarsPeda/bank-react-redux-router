import { ICards } from "../../types";
import {
  CLEAR_LOANS_DATA,
  SetLoansActionTypes,
  SET_LONER_CARDS
} from "../types/loans.types";

export interface ILoansState {
  lonerCards: ICards[];
}

// Initial State
const initialState: ILoansState = {
  lonerCards: []
};

export default (
  state = initialState,
  action: SetLoansActionTypes
): ILoansState => {
  switch (action.type) {
    case SET_LONER_CARDS:
      return {
        ...state,
        lonerCards: action.payload
      };
    case CLEAR_LOANS_DATA:
      return initialState;

    default:
      return state;
  }
};
