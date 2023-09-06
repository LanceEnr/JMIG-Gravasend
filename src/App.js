import "./App.css";
import React, { useReducer } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "@fontsource/roboto";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Faqs from "./pages/Faqs";
import authReducer from "./store/reducers/authReducer";
import Orders from "./pages/Orders";
import Appointments from "./pages/Appointments";
const initialState = {
  isAuthenticated: false,
};

function App() {
  const [authState, authDispatch] = useReducer(authReducer, initialState);
  return (
    <div className="App">
      <Router>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/products" exact element={<Products />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/contact" exact element={<Contact />} />
          <Route path="/orders" exact element={<Orders />} />
          <Route path="/appointments" exact element={<Appointments />} />
          <Route path="/forgotpassword" exact element={<ForgotPassword />} />
          <Route path="/faqs" exact element={<Faqs />} />
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
          <Route path="/register" exact element={<Register />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
