import { IUser } from "../../types";
import { SET_USER_DATA, UserActionTypes } from "../types";

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
    client_id: 0
  }
};

export default (state = initialState, action: UserActionTypes): IUserState => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        user: action.payload
      };

    default:
      return state;
  }
};
