import "./App.css";
import React, { useReducer } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
} from "react-router-dom";
import About from "./pages/About";
import Login from "./pages/Login";
import authReducer from "./store/reducers/authReducer";

const initialState = {
  isAuthenticated: false,
};

function App() {
  const [authState, authDispatch] = useReducer(authReducer, initialState);

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/products" exact element={<Products />} />
          <Route path="/about" exact element={<About />} />
          <Route
            path="/login"
            exact
            element={<Login dispatch={authDispatch} />}
          />
          <Route
            path="/"
            exact
            render={() =>
              authState.isAuthenticated ? (
                <Home />
              ) : (
                <Login dispatch={authDispatch} />
              )
            }
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
