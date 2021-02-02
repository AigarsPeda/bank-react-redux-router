import { IUser } from "../../types";
import {
  CLEAR_USER_DATA,
  SET_USER_DATA,
  UserActionTypes
} from "../types/user.types";

export interface IUserState {
  user: IUser;
}

// Initial State
const initialState: IUserState = {
  user: {
    name: "",
    surname: "",
    email: "",
    created_on: "",
    client_id: 0,
    clients_total_balance: ""
  }
};

export default (state = initialState, action: UserActionTypes): IUserState => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        user: action.payload
      };

    case CLEAR_USER_DATA:
      return initialState;

    default:
      return state;
  }
};
