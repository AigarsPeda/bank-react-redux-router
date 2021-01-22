import store from "../redux/store";
const BASE_URL = "http://localhost:8000";

// fetch option object interface
interface IOptions {
  method: string;
  headers: {
    Accept: string;
    "Content-Type": string;
    Authorization: string;
  };
  body?: string;
}

// functions argument is object with this keys
interface IArgs {
  url: string;
  method: string;
  data?: Object;
}

export const callAPI = async ({ url, method, data }: IArgs) => {
  const state = store.getState();

  const token = state.auth.token;

  const options: IOptions = {
    method: method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  };

  // if there are data object add it to options
  if (data) {
    options.body = JSON.stringify({
      ...data
    });
  }

  const rawResponse = await fetch(`${BASE_URL}${url}`, options);

  const response = await rawResponse.json();
  return response;
};
