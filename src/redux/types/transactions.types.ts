import { ITransactions } from "../../types";

// transactions
export const SET_TRANSACTION = "SET_TRANSACTION";
interface ISetTransactionsAction {
  type: typeof SET_TRANSACTION;
  payload: ITransactions[];
}

export const CLEAR_TRANSACTION = "CLEAR_TRANSACTION";
interface IClearTransactionsAction {
  type: typeof CLEAR_TRANSACTION;
}

export const SET_CARD_TRANSACTIONS = "SET_CARD_TRANSACTIONS";
interface ISetCardTransactionsAction {
  type: typeof SET_CARD_TRANSACTIONS;
  payload: ITransactions[];
}

export const SET_TRANSACTION_IS_LOADING = "SET_TRANSACTION_IS_LOADING";
interface ISetIsTransactionsAction {
  type: typeof SET_TRANSACTION_IS_LOADING;
  payload: boolean;
}

export type SetTransactionsActionTypes =
  | ISetTransactionsAction
  | IClearTransactionsAction
  | ISetCardTransactionsAction
  | ISetIsTransactionsAction;
