import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import rootReducer from "./store/reducers/authReducer";
import App from "./App";
import AdminApp from "./AdminApp";
import reportWebVitals from "./reportWebVitals";

const store = createStore(rootReducer);

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: "#83948a",
          "&:hover": {
            backgroundColor: "#6d7f71",
          },
          "&:active": {
            backgroundColor: "#5b6a58",
          },
        },
        outlined: {
          borderColor: "#83948a",
          "&:hover": {
            borderColor: "#aebcbf", // replace with the color you want when hovered
          },
          "&:active": {
            borderColor: "#aebcbf",
          },
        },
      },
    },
  },
});
document.title = "JMIG Gravel and Sand Supply";
const shouldRenderAdminApp = window.location.pathname.startsWith("/admin");

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        {shouldRenderAdminApp ? <AdminApp /> : <App />}
      </ThemeProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
