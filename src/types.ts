export type IUserAuth = {
  user: IUser;
  token: IToken;
  error?: string;
};

export type IUser = {
  name: string;
  surname: string;
  email: string;
  created_on: string;
  client_id: number;
  clients_total_balance: string;
};

export type IToken = string;

export type IUserSignUp = {
  name: string;
  surname: string;
  email: string;
  password: string;
};

export type IUserLogIn = {
  email: string;
  password: string;
};

export type ICards = {
  card_id: number;
  card_no: string;
  bank_name: string;
  total_balance: string;
  client_id: number;
  lender: boolean;
};

export type ITransactions = {
  formatted_date: string;
  withdraw_amount: string | null;
  deposit_amount: string | null;
  balance: string;
  transaction_id: string;
  card_id: string;
  deposit_description: string | null;
  withdraw_description: string | null;
};
