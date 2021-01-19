import { IUser } from "../types";

// AUTH TYPES
export const AUTHENTICATE_USER = "AUTHENTICATE_USER";
interface IAuthenticateUserAction {
  type: typeof AUTHENTICATE_USER;
  payload: string;
}

export const UNAUTHENTICATED_USER = "UNAUTHENTICATED_USER";
interface IUnauthenticatedUserAction {
  type: typeof UNAUTHENTICATED_USER;
}

export type AuthenticateActionTypes =
  | IAuthenticateUserAction
  | IUnauthenticatedUserAction;

// USER TYPES
export const SET_USER_DATA = "SET_USER_DATA";
interface ISetUserAction {
  type: typeof SET_USER_DATA;
  payload: IUser;
}

export const CLEAR_USER_DATA = "CLEAR_USER_DATA";
interface IClearUserDataAction {
  type: typeof CLEAR_USER_DATA;
  // payload: ScreamType[];
}

export type UserActionTypes = ISetUserAction | IClearUserDataAction;
