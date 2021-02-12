import { ThunkAction } from "redux-thunk";
import { callAPI } from "../../services/callAPI";
import { ICards } from "../../types";
import { RootStateType } from "../reducers";
import { CardsActionTypes, SET_CARDS_DATA } from "../types/cards.types";

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
