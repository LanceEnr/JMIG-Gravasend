import "./App.css";
import React, { useReducer } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  RouteProps,
} from "react-router-dom";
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
import ProductDetails from "./pages/ProductDetails";
import ServiceDetails from "./pages/ServiceDetails";

import UserDashboard from "./pages/UserDashboard";
import authReducer from "./store/reducers/authReducer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegister from "./pages/admin/AdminRegister";
import Services from "./pages/Services";

const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
};

function PrivateRoute({ element, isAuthenticated }) {
  return isAuthenticated ? element : <Navigate to="/login" />;
}

function App() {
  const [authState, authDispatch] = useReducer(authReducer, initialState);

  const isAuthenticated = authState.isAuthenticated;
  const handleLogout = () => {
    localStorage.removeItem("token");
    authDispatch({ type: "LOGOUT" });
  };
  return (
    <div className="App">
      <Router>
        <ResponsiveAppBar
          handleLogout={handleLogout}
          isAuthenticated={isAuthenticated}
        />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/products" exact element={<Products />} />
          <Route path="/services" exact element={<Services />} />

          <Route path="/about" exact element={<About />} />
          <Route path="/contact" exact element={<Contact />} />
          <Route path="/forgotpassword" exact element={<ForgotPassword />} />
          <Route path="/productdetails" exact element={<ProductDetails />} />
          <Route path="/servicedetails" exact element={<ServiceDetails />} />

          <Route path="/admindashboard" exact element={<AdminDashboard />} />
          <Route path="/adminlogin" exact element={<AdminLogin />} />
          <Route path="/adminregister" exact element={<AdminRegister />} />
          <Route path="/faqs" exact element={<Faqs />} />

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
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
