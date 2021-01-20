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
