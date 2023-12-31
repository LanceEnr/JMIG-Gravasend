import "./App.css";
import React, { useReducer, useEffect } from "react";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import "@fontsource/montserrat"; // Defaults to weight 400
import "@fontsource/montserrat/400.css"; // Specify weight
import "@fontsource/montserrat/400-italic.css"; // Specify weight and style

import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Faqs from "./pages/Faqs";
import ProductDetails from "./pages/ProductDetails";
import UserDashboard from "./pages/UserDashboard";
import authReducer from "./store/reducers/authReducer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppFooter from "./components/AppFooter";
import TopBar from "./components/TopBar";
import { Helmet, HelmetProvider } from "react-helmet-async";

const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
};

function App() {
  document.title = "GravaSend";
  const [authState, authDispatch] = useReducer(authReducer, initialState);

  const isAuthenticated = authState.isAuthenticated;
  const handleLogout = () => {
    localStorage.removeItem("token");
    authDispatch({ type: "LOGOUT" });
  };
  const isAdmin = !!localStorage.getItem("adminToken"); // Check for admin token

  return (
    <div className="App">
      <Router basename="/">
        <MainApp
          handleLogout={handleLogout}
          isAuthenticated={isAuthenticated}
          authDispatch={authDispatch}
        />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </Router>
    </div>
  );
}

function MainApp({ handleLogout, isAuthenticated, authDispatch }) {
  // Get current location
  const location = useLocation();

  // Determine if the current page is Login, Register, or ForgotPassword
  const hideAppBarAndFooter = [
    "/login",
    "/register",
    "/forgotpassword",
  ].includes(location.pathname);

  useEffect(() => {
    document.title = "Gravasend";
    const title = getTitle(location.pathname);
    document.title = title;
  }, [location.pathname]);

  const getTitle = (path) => {
    switch (path) {
      case "/":
        return "Gravasend";
      case "/Products":
        return "Products";
      case "/FAQs":
        return "FAQ";
      case "/About":
        return "About Us";
      case "/Contact":
        return "Contact Us";
      case "/Dashboard":
        return "Dashboard";
      case "/productdetails":
        return "Product Details";

      default:
        return "Gravasend";
    }
  };
  return (
    <>
      {!hideAppBarAndFooter && <TopBar />}
      {!hideAppBarAndFooter && (
        <ResponsiveAppBar
          handleLogout={handleLogout}
          isAuthenticated={isAuthenticated}
        />
      )}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/productdetails" element={<ProductDetails />} />
        <Route path="/faqs" element={<Faqs />} />

        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <UserDashboard /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" state={{ fromLogin: true }} />
            ) : (
              <Login dispatch={authDispatch} />
            )
          }
        />

        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" state={{ fromRegister: true }} />
            ) : (
              <Register dispatch={authDispatch} />
            )
          }
        />
      </Routes>

      {!hideAppBarAndFooter && <AppFooter />}
    </>
  );
}

export default App;
