import { ThunkAction } from "redux-thunk";
import { callAPI } from "../../services/callAPI";
import { ITransactions } from "../../types";
import { RootStateType } from "../reducers";
import {
  SetTransactionsActionTypes,
  SET_CARD_TRANSACTIONS,
  SET_TRANSACTION,
  SET_TRANSACTION_IS_LOADING
} from "../types/transactions.types";

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateType,
  unknown,
  SetTransactionsActionTypes
>;

// get cards transactions
export const getTransactions = (id: string): AppThunk => async (dispatch) => {
  try {
    dispatch({
      type: SET_TRANSACTION_IS_LOADING,
      payload: true
    });
    // in callAPI if there are token in REDUX STORE
    // it is added to AUTHORIZATION headers
    const response: ITransactions[] = await callAPI({
      url: `/transactions/${id}`,
      method: "GET"
    });

    // console.log("RESPONSE: ", response);

    dispatch({
      type: SET_TRANSACTION,
      payload: response
    });
  } catch (error) {
    console.log(error);
  }
};

// get all transactions
export const getAllTransactions = (): AppThunk => async (dispatch) => {
  try {
    dispatch({
      type: SET_TRANSACTION_IS_LOADING,
      payload: true
    });
    // in callAPI if there are token in REDUX STORE
    // it is added to AUTHORIZATION headers
    const response: ITransactions[] = await callAPI({
      url: `/transactions/all_transactions`,
      method: "GET"
    });

    // console.log("RESPONSE xxxxxx: ", response);

    dispatch({
      type: SET_TRANSACTION,
      payload: response
    });
  } catch (error) {
    console.log(error);
  }
};

// get specific card transaction
export const getCardTransactions = (cardId: string): AppThunk => async (
  dispatch
) => {
  try {
    dispatch({
      type: SET_TRANSACTION_IS_LOADING,
      payload: true
    });
    // in callAPI if there are token in REDUX STORE
    // it is added to AUTHORIZATION headers
    const response: ITransactions[] = await callAPI({
      url: `/transactions/${cardId}`,
      method: "GET"
    });

    // console.log("RESPONSE xxxxxx: ", response);

    dispatch({
      type: SET_CARD_TRANSACTIONS,
      payload: response
    });
  } catch (error) {
    console.log(error);
  }
};
