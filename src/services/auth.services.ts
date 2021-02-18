import { IUserAuth, IUserLogIn, IUserSignUp } from "../types";

// axios({
//   method: 'post',
//   url: '/login',
//   data: {
//     user: 'brunos',
//     lastName: 'ilovenodejs'
//   }
// });

export const createUser = async (userData: IUserSignUp) => {
  const rawResponse = await fetch("http://localhost:8000/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
      password: userData.password
    })
  });

  const response: IUserAuth = await rawResponse.json();
  return response;
};

export const singInUser = async (userData: IUserLogIn) => {
  const rawResponse = await fetch("http://localhost:8000/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      // email: userData.email,
      // password: userData.password
      ...userData
    })
  });

  const response: IUserAuth = await rawResponse.json();
  return response;
};
