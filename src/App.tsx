import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";
import AppRoutes from "./routes/AppRoutes";

import "./index.scss";

const App: React.FC = () => {
  // const location = useLocation();
  // const isMatch = matchPath(location.pathname, {
  //   path: ["/login", "/signup"],
  //   exact: true,
  //   strict: true
  // });

  // console.log(isMatch);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <div className="App">
            <AppRoutes />
          </div>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
