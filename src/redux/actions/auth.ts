import { ThunkAction } from "redux-thunk";
import { callAPI } from "../../services/callAPI";
import { IUserAuth, IUserLogIn, IUserSignUp } from "../../types";
import { RootStateType } from "../reducers";
import {
  AUTHENTICATE_USER,
  UNAUTHENTICATED_USER,
  AuthenticateActionTypes
} from "../types/auth.types";
import { CardsActionTypes, CLEAR_CARDS_DATA } from "../types/cards.types";
import {
  SET_ERROR,
  CLEAR_ERROR,
  SetErrorActionTypes
} from "../types/error.types";
import {
  CLEAR_TRANSACTION,
  SetTransactionsActionTypes
} from "../types/transactions.types";
import {
  SET_USER_DATA,
  UserActionTypes,
  CLEAR_USER_DATA
} from "../types/user.types";

type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateType,
  unknown,
  | AuthenticateActionTypes
  | SetErrorActionTypes
  | UserActionTypes
  | CardsActionTypes
  | SetTransactionsActionTypes
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

// login user
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

export const logOutUser = (): AppThunk => async (dispatch) => {
  try {
    dispatch({
      type: UNAUTHENTICATED_USER
    });
    dispatch({
      type: CLEAR_CARDS_DATA
    });
    dispatch({
      type: CLEAR_ERROR
    });
    dispatch({
      type: CLEAR_TRANSACTION
    });
    dispatch({
      type: CLEAR_USER_DATA
    });
  } catch (error) {
    console.log(error);
  }
};
