import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { persistStore } from "redux-persist";

import rootReducers, { RootStateType } from "./reducers/index";
import { AppActionsTypes } from "./types";

const initialState = {};
const middleware = [thunk as ThunkMiddleware<RootStateType, AppActionsTypes>];

const store = createStore(
  rootReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);

export default store;
