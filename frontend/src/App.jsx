import React from "react";
import AppRouter from "./routes/AppRouter.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

export const serverUrl = "http://localhost:8000";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
