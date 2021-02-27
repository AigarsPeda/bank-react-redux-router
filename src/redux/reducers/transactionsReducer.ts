import { ITransactions } from "../../types";
import {
  CLEAR_TRANSACTION,
  SetTransactionsActionTypes,
  SET_CARD_TRANSACTIONS,
  SET_TRANSACTION,
  SET_TRANSACTION_IS_LOADING
} from "../types/transactions.types";

export interface ITransactionsState {
  transactions: ITransactions[];
  isLoadingTransactions: boolean;
  cardTransactions: ITransactions[];
}

// Initial State
const initialState: ITransactionsState = {
  transactions: [],
  cardTransactions: [],
  isLoadingTransactions: false
};

export default (
  state = initialState,
  action: SetTransactionsActionTypes
): ITransactionsState => {
  switch (action.type) {
    case SET_TRANSACTION_IS_LOADING:
      return {
        ...state,
        isLoadingTransactions: action.payload
      };

    case SET_TRANSACTION:
      return {
        ...state,
        transactions: action.payload,
        isLoadingTransactions: false
      };

    case SET_CARD_TRANSACTIONS:
      return {
        ...state,
        cardTransactions: action.payload,
        isLoadingTransactions: false
      };

    case CLEAR_TRANSACTION:
      return initialState;

    default:
      return state;
  }
};
