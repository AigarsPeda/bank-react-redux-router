import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { callAPI } from "../../services/callAPI";
import { IUserAuth, IUserLogIn, IUserSignUp } from "../../types";
import { RootState } from "../reducers";
import {
  AuthenticateActionTypes,
  AUTHENTICATE_USER,
  SET_ERROR,
  SET_USER_DATA
} from "../types";

type AppThunk<ReturnType = any> = ThunkAction<
  ReturnType,
  RootState,
  AuthenticateActionTypes,
  Action<string>
>;

// create new user
export const signUpUser = (signUpData: IUserSignUp): AppThunk => async (
  dispatch
) => {
  try {
    const response = await callAPI({
      url: "/signup",
      method: "POST",
      data: signUpData
    });

    const { token, user, error }: IUserAuth = response;
    dispatch({
      type: AUTHENTICATE_USER,
      payload: token
    });
    dispatch({
      type: SET_USER_DATA,
      payload: user
    });
    dispatch({
      type: SET_ERROR,
      payload: error
    });
  } catch (error) {
    console.log(error);
  }
};

export const logInUser = (loginData: IUserLogIn): AppThunk => async (
  dispatch
) => {
  try {
    const response = await callAPI({
      url: "/login",
      method: "POST",
      data: loginData
    });

    const { token, user, error }: IUserAuth = response;

    dispatch({
      type: AUTHENTICATE_USER,
      payload: token
    });
    dispatch({
      type: SET_USER_DATA,
      payload: user
    });
    dispatch({
      type: SET_ERROR,
      payload: error
    });
  } catch (error) {
    console.log(error);
  }
};
