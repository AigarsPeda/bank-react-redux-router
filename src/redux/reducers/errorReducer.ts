import {
  CLEAR_ERROR,
  SetErrorActionTypes,
  SET_ERROR
} from "../types/error.types";

export interface IErrorState {
  error: string | undefined;
}

// Initial State
const initialState: IErrorState = {
  error: ""
};

export default (
  state = initialState,
  action: SetErrorActionTypes
): IErrorState => {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case CLEAR_ERROR:
      return initialState;

    default:
      return state;
  }
};
