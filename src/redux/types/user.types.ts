import { IUser } from "../../types";

// USER TYPES
export const SET_USER_DATA = "SET_USER_DATA";
interface ISetUserAction {
  type: typeof SET_USER_DATA;
  payload: IUser;
}

// export const GET_USER_DATA = "GET_USER_DATA";
// interface IGetUserDataAction {
//   type: typeof GET_USER_DATA;
//   payload: IUser;
// }

export const CLEAR_USER_DATA = "CLEAR_USER_DATA";
interface IClearUserDataAction {
  type: typeof CLEAR_USER_DATA;
}

export type UserActionTypes = ISetUserAction | IClearUserDataAction;
// | IGetUserDataAction;
