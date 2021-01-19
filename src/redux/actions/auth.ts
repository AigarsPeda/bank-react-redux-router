import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { createUser } from "../../services/auth.services";
import { callAPI } from "../../services/callAPI";
import { IUserAuth, IUserLogIn, IUserSignUp } from "../../types";

import { RootState } from "../reducers";
import {
  AuthenticateActionTypes,
  AUTHENTICATE_USER,
  SET_USER_DATA
} from "../types";

type AppThunk<ReturnType = any> = ThunkAction<
  ReturnType,
  RootState,
  AuthenticateActionTypes,
  Action<string>
>;

// create new user
export const signUpUser = (userData: IUserSignUp): AppThunk => async (
  dispatch
) => {
  try {
    const response = await createUser(userData);
    console.log("Created User: ", response);
    const { token, user }: IUserAuth = response;
    dispatch({
      type: AUTHENTICATE_USER,
      payload: token
    });
    dispatch({
      type: SET_USER_DATA,
      payload: user
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

    const { token, user }: IUserAuth = response;
    dispatch({
      type: AUTHENTICATE_USER,
      payload: token
    });
    dispatch({
      type: SET_USER_DATA,
      payload: user
    });
  } catch (error) {
    console.log(error);
  }
};
