import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer, { IAuthState } from "./authReducer";
import cardsReducer, { ICardsState } from "./cardsReducer";
import errorReducer, { IErrorState } from "./errorReducer";
import loansReducer, { ILoansState } from "./loansReducer";
import transactionsReducer, { ITransactionsState } from "./transactionsReducer";
import userReducer, { IUserState } from "./userReducer";

interface IDefaultState {
  user: IUserState;
  auth: IAuthState;
  error: IErrorState;
  cards: ICardsState;
  transactions: ITransactionsState;
  loans: ILoansState;
}

const persistConfig = {
  key: "root",
  storage,
  // blacklist is what reducers not to persist
  // in this case error after page reload
  // will be gone
  blacklist: ["error"]
};

const appReducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  error: errorReducer,
  cards: cardsReducer,
  transactions: transactionsReducer,
  loans: loansReducer
});

const rootReducers = (state: IDefaultState | undefined, action: any) => {
  const newState = state;

  return appReducers(newState, action);
};

export default persistReducer(persistConfig, rootReducers);

export type RootStateType = ReturnType<typeof rootReducers>;
