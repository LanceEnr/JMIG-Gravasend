import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import rootReducer from "./store/reducers/authReducer";
import App from "./App";
import AdminApp from "./AdminApp";
import reportWebVitals from "./reportWebVitals";

const store = createStore(rootReducer);

const shouldRenderAdminApp = window.location.pathname.startsWith("/admin");

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      {shouldRenderAdminApp ? <AdminApp /> : <App />}
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
