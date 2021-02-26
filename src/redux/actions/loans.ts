import { ThunkAction } from "redux-thunk";
import { callAPI } from "../../services/callAPI";
import { ICards } from "../../types";
import { RootStateType } from "../reducers";
import { SetLoansActionTypes, SET_LONER_CARDS } from "../types/loans.types";

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateType,
  unknown,
  SetLoansActionTypes
>;

// get all cards
export const getLenderCards = (): AppThunk => async (dispatch) => {
  try {
    // in callAPI if there are token in REDUX STORE
    // it is added to AUTHORIZATION headers
    const response: ICards[] = await callAPI({
      url: "/lenders",
      method: "GET"
    });

    // console.log("RESPONSE: ", response);

    dispatch({
      type: SET_LONER_CARDS,
      payload: response
    });
  } catch (error) {
    console.log(error);
  }
};
