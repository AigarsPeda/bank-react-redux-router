import { ThunkAction } from "redux-thunk";
import { callAPI } from "../../services/callAPI";
import { ICards } from "../../types";
import { RootStateType } from "../reducers";
import {
  CardsActionTypes,
  LOADING_CARDS_DATA,
  SET_CARDS_DATA
} from "../types/cards.types";

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateType,
  unknown,
  CardsActionTypes
>;

// get all cards
export const getCards = (): AppThunk => async (dispatch) => {
  try {
    // in callAPI if there are token in REDUX STORE
    // it is added to AUTHORIZATION headers
    const response: ICards[] = await callAPI({
      url: "/cards",
      method: "GET"
    });

    // console.log("RESPONSE: ", response);

    dispatch({
      type: SET_CARDS_DATA,
      payload: response
    });
  } catch (error) {
    console.log(error);
  }
};

interface IDeposit {
  deposit_amount: number;
  deposit_description: string;
}

export const makeDeposit = (cardId: string, data: IDeposit): AppThunk => async (
  dispatch
) => {
  dispatch({
    type: LOADING_CARDS_DATA,
    payload: true
  });

  try {
    const response: string = await callAPI({
      url: `/deposit/${cardId}`,
      method: "POST",
      data: data
    });

    dispatch({
      type: LOADING_CARDS_DATA,
      payload: false
    });

    return response;

    // console.log("response: ", response);
  } catch (error) {
    console.log(error);

    return "Something went wrong!";
  }
};
