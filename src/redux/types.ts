import { AuthenticateActionTypes } from "./types/auth.types";
import { CardsActionTypes } from "./types/cards.types";
import { SetErrorActionTypes } from "./types/error.types";
import { SetLoansActionTypes } from "./types/loans.types";
import { SetTransactionsActionTypes } from "./types/transactions.types";
import { UserActionTypes } from "./types/user.types";

export type AppActionsTypes =
  | UserActionTypes
  | SetTransactionsActionTypes
  | SetErrorActionTypes
  | CardsActionTypes
  | AuthenticateActionTypes
  | SetLoansActionTypes;
