// ERROR TYPES
export const SET_ERROR = "SET_ERROR";
interface ISetErrorAction {
  type: typeof SET_ERROR;
  payload: string | undefined;
}

export const CLEAR_ERROR = "CLEAR_ERROR";
interface IClearErrorAction {
  type: typeof CLEAR_ERROR;
}
export type SetErrorActionTypes = ISetErrorAction | IClearErrorAction;
