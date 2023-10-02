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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegister from "./pages/admin/AdminRegister";

import ProductDetails from "./pages/ProductDetails";

import UserDashboard from "./pages/UserDashboard";

const initialState = {
  isAuthenticated: false,
};

function App() {
  const [authState, authDispatch] = useReducer(authReducer, initialState);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/products" exact element={<Products />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/contact" exact element={<Contact />} />
          <Route path="/forgotpassword" exact element={<ForgotPassword />} />
          <Route path="/productdetails" exact element={<ProductDetails />} />
          <Route path="/dashboard" exact element={<UserDashboard />} />
          <Route path="/admindashboard" exact element={<AdminDashboard />} />
          <Route path="/adminlogin" exact element={<AdminLogin />} />
          <Route path="/adminregister" exact element={<AdminRegister />} />

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
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </Router>
    </div>
  );
}

export default App;
