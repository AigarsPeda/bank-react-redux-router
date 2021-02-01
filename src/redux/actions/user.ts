import { ThunkAction } from "redux-thunk";
import { callAPI } from "../../services/callAPI";
import { RootStateType } from "../reducers";
import { SET_USER_DATA, UserActionTypes } from "../types/user.types";
import { IUser } from "./../../types";

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateType,
  unknown,
  UserActionTypes
>;

// get all cards
export const getUser = (): AppThunk => async (dispatch) => {
  try {
    // in callAPI if there are token in REDUX STORE
    // it is added to AUTHORIZATION headers
    const response: IUser = await callAPI({
      url: "/user",
      method: "GET"
    });

    dispatch({
      type: SET_USER_DATA,
      payload: response
    });
  } catch (error) {
    console.log(error);
  }
};
